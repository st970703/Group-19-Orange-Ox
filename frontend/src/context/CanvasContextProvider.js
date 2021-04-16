import React, { useState } from 'react';
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
    const [save, setSave] = useState(false);
    const [clear, setClear] = useState(false);

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

    socket.on('clear', handleClear);

    function handleClear() {
        console.log('handleClear')

        if (!clear
            && (penPaths.length > 0
                || shapes.length > 0
                || eraserPath.length > 0)
        ) {
            setClear(true);
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
        } else if (type === 'clear') {
            socket.emit('clear');
        }
    }

    function addEraserPoint(point) {
        if (!eraserPath.includes(point) && point) {
            eraserPath.push(point);
            currentEraserPoint = point;
        }
    }

    function clearDrawingData() {
        if (penPaths.length > 0) {
            penPaths.splice(0);
        }

        if (shapes.length > 0) {
            shapes.splice(0);
        }

        if (eraserPath.length > 0) {
            eraserPath.splice(0);
        }

        currentPenPath = [];
        currentShape = null;
        currentEraserPoint = null;
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
                console.log('shapes.push = ' + currentShapeCopy);
            }
        } else {
            currentShape = null;
        }
    }

    function isCanvasBlank() {
        // https://stackoverflow.com/questions/17386707/how-to-check-if-a-canvas-is-blank
        const defaultCanvas = document.getElementById('defaultCanvas0');
        const context = defaultCanvas.getContext('2d');

        const pixelBuffer = new Uint32Array(
            context.getImageData(0, 0, defaultCanvas.width, defaultCanvas.height).data.buffer
        );

        const blankPixelValue = 4294967295;

        return !pixelBuffer.some(color => color !== blankPixelValue);
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
        clearDrawingData,
        setCurrentShape,
        setCurrentShapeEndCoord,
        pushCurrentShapeToShapes,
        save,
        setSave,
        clear,
        setClear,
        isCanvasBlank
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