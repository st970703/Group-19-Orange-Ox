import React from 'react';
import socketIOClient from "socket.io-client";

const CanvasContext = React.createContext({
    penPaths: [],
    shapes: [],
    eraserPath: []
});

function CanvasContextProvider({ children }) {

    const penPaths = [];
    const shapes = [];
    const eraserPath = [];

    const ENDPOINT = `http://${process.env.REACT_APP_SOCKET_ADDR}:${process.env.REACT_APP_SOCKET_PORT}`;
    let socket = socketIOClient(ENDPOINT);

    socket.on('pen', handlePath);

    function handlePath(data) {
        if (!penPaths.includes(data) && data) {
            penPaths.push(data);
        }
    }

    socket.on('shape', handleShape);

    function handleShape(data) {
        if (!shapes.includes(data) && data) {
            shapes.push(data);
        }
    }

    socket.on('eraser', handleEraser);

    function handleEraser(data) {
        if (!eraserPath.includes(data) && data) {
            eraserPath.push(data);
        }
    }

    let currentPenPath = [];
    let currentShape;
    let currentEraserPoint;

    function addPenPoint(point) {
        if (point && !currentPenPath.includes(point)) {
            currentPenPath.push(point);
        }
    }

    function resetPenPath() {
        currentPenPath = [];
    }

    function addPenPathToPaths() {
        if (!penPaths.includes(currentPenPath)) {
            penPaths.push(currentPenPath);
        }
    }

    function emitData(type) {
        if (type === 'pen') {
            if (currentPenPath && currentPenPath.length > 0) {
                socket.emit('pen', currentPenPath);
            }
        } else if (type === 'shape') {
            if (currentShape
                && currentShape.width > 0
                && currentShape.height > 0) {
                socket.emit('shape', currentShape);
            }
        } else if (type === 'eraser') {
            if (currentEraserPoint) {
                socket.emit('eraser', currentEraserPoint);
            }
        }
    }

    function addEraserPoint(point) {
        if (!eraserPath.includes(point)) {
            eraserPath.push(point);
            currentEraserPoint = point;
        }
    }

    function clearCanvas() {
        console.log('Clearing canvas');
        socket.emit('clear', null);

        penPaths.splice(0);
        shapes.splice(0);
        eraserPath.splice(0);
    }

    function setCurrentShape(shape) {
        if (shape) {
            currentShape = shape;
        }
    }

    function setCurrentShapeEndCoord(endX, endY) {
        if (endX && endY && currentShape) {
            currentShape.endX = endX;
            currentShape.endY = endY;

            currentShape.width = Math.abs(currentShape.endX - currentShape.x);
            currentShape.height = Math.abs(currentShape.endY - currentShape.y);
        }
    }

    function pushCurrentShapeToShapes() {
        if (currentShape
            && currentShape.width > 0
            && currentShape.height > 0) {
            const currentShapeCopy = { ...currentShape };
            if (!shapes.includes(currentShapeCopy)) {
                shapes.push(currentShapeCopy);
            }
        } else {
            currentShape = null;
        }
    }

    // The context value that will be supplied to any descendants of this component.
    const context = {
        penPaths,
        shapes,
        eraserPath,
        addPenPoint,
        resetPenPath,
        addPenPathToPaths,
        emitData,
        addEraserPoint,
        clearCanvas,
        setCurrentShape,
        setCurrentShapeEndCoord,
        pushCurrentShapeToShapes
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <CanvasContext.Provider value={context}>
            {children}
        </CanvasContext.Provider>
    );
}

export {
    CanvasContext,
    CanvasContextProvider
};