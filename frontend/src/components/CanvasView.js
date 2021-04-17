import { React, useContext } from "react";
import Sketch from "react-p5";
import { CanvasContext } from '../context/CanvasContextProvider';

function CanvasView({ canvasWidth, canvasHeight }) {

  const {
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
    brush,
    weight
  } = useContext(CanvasContext);

  const bgColor = 255;
  let canvas = null;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
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
    if (path && path.length > 0) {
      p5.beginShape();
      path.forEach(point => {
        p5.stroke(point.color);
        p5.strokeWeight(point.weight);
        p5.vertex(point.x, point.y);
      });
      p5.endShape();
    }
  }

  function drawShape(shape, p5) {
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

    if (
      brush === 'pen'
      || brush === 'large'
      || brush === 'small'
    ) {
      if (p5.mouseIsPressed) {
        const point = {
          x: p5.mouseX,
          y: p5.mouseY,
          color,
          weight,
          brush
        };

        if (point.x > 0 && point.y > 0) {
          addPenPoint(point);
        }
      }
    } else if (brush === 'eraser') {
      if (p5.mouseIsPressed) {
        const point = {
          x: p5.mouseX,
          y: p5.mouseY,
          pX: p5.pmouseX,
          pY: p5.pmouseY,
          weight,
          color: bgColor,
          brush
        }

        if (point.x > 0 && point.y > 0) {
          addEraserPoint(point);
          emitData('eraser');
        }
      }
    }

    if (drawingData.length > 0) {
      for (const data of drawingData) {
        if (
          (Array.isArray(data)
            && data.length > 0
            && data !== [])
        ) {
          // is 'pen'
          drawPen(data, p5);
        } else if (
          data.brush === 'circle'
          || data.brush === 'rectangle'
          || data.brush === 'triangle'
        ) {
          drawShape(data, p5);
        } else if (data.brush === 'eraser') {
          drawEraser(data, p5);
        }
      }
    }

    if (clear && !isCanvasBlank()) {
      clearDrawingData();

      p5.clear();
      p5.background(bgColor);

      setClear(false);
    }

    if (save && !isCanvasBlank()) {
      p5.save();
      setSave(false);
    }
  }

  const mousePressed = (p5) => {
    if (
      brush === 'pen'
      || brush === 'large'
      || brush === 'small'
    ) {
      resetPenPath();
      recordPenPath();
    } else if (
      brush === 'circle'
      || brush === 'rectangle'
      || brush === 'triangle'
    ) {
      const shape = {
        x: p5.mouseX,
        y: p5.mouseY,
        color,
        weight,
        brush
      }

      if (shape.x > 0 && shape.y > 0) {
        setCurrentShape(shape);
      }
    }
  }

  const mouseReleased = (p5) => {
    console.log('drawingData = ' + JSON.stringify(drawingData));

    if (brush === 'pen'
      || brush === 'large'
      || brush === 'small') {
      emitData('pen');
    } else if (
      brush === 'circle'
      || brush === 'rectangle'
      || brush === 'triangle'
    ) {
      setCurrentShapeEndCoord(p5.mouseX, p5.mouseY);

      emitData('shape');

      recordCurrentShape();
    }
  }

  return (
    <Sketch setup={setup} draw={draw}
      mousePressed={mousePressed} mouseReleased={mouseReleased} />
  );
}

export default CanvasView;