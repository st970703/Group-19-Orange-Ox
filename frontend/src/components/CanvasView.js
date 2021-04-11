import { React } from "react";
import Sketch from "react-p5";
import socketIOClient from "socket.io-client";


function CanvasView({ color, stroke, clear, setClear, brush, setBrush, canvasWidth, canvasHeight }) {

  let penPaths = [];
  let currentPath = [];

  const shapes = [];
  let currentShape;

  const ENDPOINT = `http://${process.env.REACT_APP_SOCKET_ADDR}:${process.env.REACT_APP_SOCKET_PORT}`;
  let socket = socketIOClient(ENDPOINT);

  let eraserPaths = [];

  const bgColor = 255;

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
    if (!eraserPaths.includes(data) && data) {
      eraserPaths.push(data);
    }
  }

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.background(bgColor);
  };

  function drawEraser(point, p5) {
    if (point) {
      p5.stroke(point.color);
      p5.strokeWeight(point.weight);
      p5.line(point.x, point.y, point.pX, point.pY);
    }
  }

  function drawPen(path, p5) {
    p5.beginShape();
    path.forEach(point => {
      p5.stroke(point.color);
      p5.strokeWeight(point.weight);
      p5.vertex(point.x, point.y);
    });
    p5.endShape();
  }

  function drawP5Shape(shape, p5) {
    if (shape) {
      p5.stroke(shape.color);
      p5.strokeWeight(shape.weight);

      if (shape.shape === "rectangle") {
        if (shape.y < shape.endY) {
          p5.rect(shape.x, shape.y, shape.width, shape.height);
        } else {
          p5.rect(shape.endX, shape.endY, shape.width, shape.height);
        }
      } else if (shape.shape === "circle") {
        if (shape.y < shape.endY) {
          p5.circle(shape.x + (shape.width / 2), shape.y + (shape.height / 2), shape.width);
        } else {
          p5.circle(shape.endX + (shape.width / 2), shape.endY + (shape.height / 2), shape.width);
        }
      } else if (shape.shape === "triangle") {
        if (shape.y < shape.endY) {
          p5.triangle(
            shape.x,
            shape.y + shape.height,
            shape.x + shape.width / 2,
            shape.y,
            shape.x + shape.width,
            shape.y + shape.height
          );
        } else {
          p5.triangle(
            shape.endX,
            shape.endY,
            shape.endX + shape.width / 2,
            shape.endY + shape.height,
            shape.endX + shape.width,
            shape.endY
          );
        }
      }
    }
  }

  const draw = (p5) => {
    p5.noFill();

    if (brush === 'pen') {
      if (p5.mouseIsPressed) {
        const point = {
          x: p5.mouseX,
          y: p5.mouseY,
          color: color,
          weight: stroke
        };

        if (!currentPath.includes(point)) {
          currentPath.push(point);
        }
      }
    } else if (brush === 'eraser') {
      if (p5.mouseIsPressed) {

        const eraser = {
          x: p5.mouseX,
          y: p5.mouseY,
          pX: p5.pmouseX,
          pY: p5.pmouseY,
          weight: stroke * 3,
          color: bgColor
        }

        if (!eraserPaths.includes(eraser)) {
          eraserPaths.push(eraser);
          socket.emit('eraser', eraser);
        }
      }
    }

    if (penPaths && penPaths.length > 0) {
      penPaths.forEach(path => drawPen(path, p5));
    }

    if (shapes && shapes.length > 0) {
      shapes.forEach(shape => drawP5Shape(shape, p5));
    }

    if (eraserPaths && eraserPaths.length > 0) {
      eraserPaths.forEach(eraserPath => drawEraser(eraserPath, p5));
    }

    if (clear) {
      console.log('Clearing canvas');
      socket.emit('clear', null);

      p5.clear();

      penPaths.splice(0);
      shapes.splice(0);

      p5.background(bgColor);

      if (!penPaths || penPaths.length === 0) {
        setClear(false);
        setBrush(null);
      }
    }
  }

  const mousePressed = (p5) => {
    if (brush === 'pen') {
      currentPath = [];

      if (!penPaths.includes(currentPath)) {
        penPaths.push(currentPath);
      }
    } else if (
      brush === 'circle'
      || brush === 'rectangle'
      || brush === 'triangle'
    ) {
      currentShape = {
        x: p5.mouseX,
        y: p5.mouseY,
        color,
        weight: stroke,
        shape: brush
      }
    }
  }

  const mouseReleased = (p5) => {
    if (brush === 'pen') {
      if (currentPath && currentPath.length > 0) {
        socket.emit('pen', currentPath);
      }
    } else if (
      brush === 'circle'
      || brush === 'rectangle'
      || brush === 'triangle'
    ) {
      currentShape.endX = p5.mouseX;
      currentShape.endY = p5.mouseY;

      currentShape.width = Math.abs(currentShape.endX - currentShape.x);
      currentShape.height = Math.abs(currentShape.endY - currentShape.y);

      const currentShapeCopy = { ...currentShape };
      if (!shapes.includes(currentShapeCopy)) {
        shapes.push(currentShapeCopy);

        socket.emit('shape', currentShapeCopy);
      }
    }
  }

  return (
    <Sketch setup={setup} draw={draw}
      mousePressed={mousePressed} mouseReleased={mouseReleased} />
  );
}

export default CanvasView;