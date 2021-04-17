import React, { useState } from 'react';
import socketIOClient from "socket.io-client";
import { colors, brushes } from '../config/CanvasConfig';

const CanvasContext = React.createContext({
    drawingData: []
});

function CanvasContextProvider({ children }) {

    const [color, setColor] = useState(
        colors.find(color => color.name === 'black').hex
    );
    const [brush, setBrush] = useState('pen');
    const [weight, setWeight] = useState(
        brushes.find(brush => brush.brushType === 'pen').weight
    );

    let drawingData = [];

    const [save, setSave] = useState(false);
    const [clear, setClear] = useState(false);

    let currentPenPath = [];
    let currentShape = null;
    let currentEraser = null;

    const ENDPOINT = `http://${process.env.REACT_APP_SOCKET_ADDR}:${process.env.REACT_APP_SOCKET_PORT}`;
    const socket = socketIOClient(ENDPOINT);

    socket.on('initialCanvas', (canvasState) => {
        for (let data of canvasState) {
            if (Array.isArray(data)
                || data.brush === 'circle'
                || data.brush === 'rectangle'
                || data.brush === 'triangle'
                || data.brush === 'eraser') {
                drawingData.push(data);
            }
        }
    });

    socket.on('pen', handlePen);

    function handlePen(data) {
        if (!drawingData.includes(data) && data) {
            drawingData.push(data);
        }
    }

    socket.on('shape', handleShape);

    function handleShape(data) {
        if (!drawingData.includes(data) && data) {
            drawingData.push(data);
        }
    }

    socket.on('eraser', handleEraser);

    function handleEraser(data) {
        if (!drawingData.includes(data) && data) {
            drawingData.push(data);
        }
    }

    socket.on('clear', handleClear);

    function handleClear() {
        if (!clear) {
            setClear(true);
        }
    }

    function addPenPoint(point) {
        if (point && !currentPenPath.includes(point)) {
            currentPenPath.push(point);
        }
    }

    function resetPenPath() {
        currentPenPath = [];
    }

    function recordPenPath() {
        if (!drawingData.includes(currentPenPath)) {
            drawingData.push(currentPenPath);
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
            if (currentEraser) {
                socket.emit('eraser', currentEraser);
            }
        } else if (type === 'clear') {
            socket.emit('clear');
        }
    }

    function addEraserPoint(point) {
        if (!drawingData.includes(point) && point) {
            drawingData.push(point);
            currentEraser = point;
        }
    }

    function clearDrawingData() {
        if (drawingData.length > 0) {
            drawingData.splice(0);
        }

        currentPenPath = [];
        currentShape = null;
        currentEraser = null;
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

    function recordCurrentShape() {
        if (currentShape
            && currentShape.width > 0
            && currentShape.height > 0) {
            const currentShapeCopy = { ...currentShape };

            if (!drawingData.includes(currentShapeCopy)) {
                drawingData.push(currentShapeCopy);
            }
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
        const isBlank = !pixelBuffer.some(color => color !== blankPixelValue);

        return isBlank;
    }

    // The context value that will be supplied to any descendants of this component.
    const context = {
        drawingData,
        addPenPoint,
        resetPenPath,
        recordPenPath,
        emitData,
        addEraserPoint,
        clearDrawingData,
        setCurrentShape,
        setCurrentShapeEndCoord,
        recordCurrentShape,
        save,
        setSave,
        clear,
        setClear,
        isCanvasBlank,
        color,
        setColor,
        brush,
        setBrush,
        weight,
        setWeight,
        currentPenPath,
        currentShape,
        currentEraser
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