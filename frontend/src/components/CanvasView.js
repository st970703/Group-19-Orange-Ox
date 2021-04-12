import { React, useContext } from "react";
import Sketch from "react-p5";
import { CanvasContext } from '../context/CanvasContextProvider';

function CanvasView({ color, stroke, clear, setClear, brush, setBrush, canvasWidth, canvasHeight }) {

  const {
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
  } = useContext(CanvasContext);

  const bgColor = 255;

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

      if (shape.brush === "rectangle") {
        if (shape.y < shape.endY) {
          p5.rect(shape.x, shape.y, shape.width, shape.height);
        } else {
          p5.rect(shape.endX, shape.endY, shape.width, shape.height);
        }
      } else if (shape.brush === "circle") {
        if (shape.y < shape.endY) {
          p5.circle(shape.x + (shape.width / 2), shape.y + (shape.height / 2), shape.width);
        } else {
          p5.circle(shape.endX + (shape.width / 2), shape.endY + (shape.height / 2), shape.width);
        }
      } else if (shape.brush === "triangle") {
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
          color,
          weight: stroke,
          brush
        };

        addPenPoint(point);
      }
    } else if (brush === 'eraser') {
      if (p5.mouseIsPressed) {

        const point = {
          x: p5.mouseX,
          y: p5.mouseY,
          pX: p5.pmouseX,
          pY: p5.pmouseY,
          weight: stroke * 3,
          color: bgColor,
          brush
        }

        addEraserPoint(point);
        emitData('eraser');
      }
    }

    if (penPaths && penPaths.length > 0) {
      penPaths.forEach(path => drawPen(path, p5));
    }

    if (shapes && shapes.length > 0) {
      shapes.forEach(shape => drawP5Shape(shape, p5));
    }

    if (eraserPath && eraserPath.length > 0) {
      eraserPath.forEach(point => drawEraser(point, p5));
    }

    if (clear) {
      p5.clear();
      p5.background(bgColor);
      clearCanvas();

      setClear(false);

      setBrush(null);
    }
  }

  const mousePressed = (p5) => {
    if (brush === 'pen') {
      resetPenPath();
      addPenPathToPaths();
    } else if (
      brush === 'circle'
      || brush === 'rectangle'
      || brush === 'triangle'
    ) {
      const shape = {
        x: p5.mouseX,
        y: p5.mouseY,
        color,
        weight: stroke,
        brush
      }

      setCurrentShape(shape);
    }
  }

  const mouseReleased = (p5) => {

    if (brush === 'pen') {
      emitData(brush);
    } else if (
      brush === 'circle'
      || brush === 'rectangle'
      || brush === 'triangle'
    ) {
      setCurrentShapeEndCoord(p5.mouseX, p5.mouseY);

      pushCurrentShapeToShapes();

      emitData('shape');
    }
  }

  return (
    <Sketch setup={setup} draw={draw}
      mousePressed={mousePressed} mouseReleased={mouseReleased} />
  );
}

export default CanvasView;