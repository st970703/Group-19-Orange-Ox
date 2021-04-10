import { React } from "react";
import Sketch from "react-p5";
import socketIOClient from "socket.io-client";


function CanvasView({ color, stroke, clear, setClear, brush, setBrush, canvasWidth, canvasHeight }) {

  let paths = [];
  let currentPath = [];

  const shapes = [];
  let currentShape;

  const ENDPOINT = `http://${process.env.REACT_APP_SOCKET_ADDR}:${process.env.REACT_APP_SOCKET_PORT}`;
  let socket = socketIOClient(ENDPOINT);
  socket.on('paths', handlePaths);

  function handlePaths(data) {
    console.log('paths received ' + JSON.stringify(data));
    
    if (Array.isArray(data)) {
      data.forEach(path => {
        paths.push(path);
      });
    }

  }

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.background(255);
  };




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
        currentPath.push(point);
      }

      paths.forEach(path => {
        p5.beginShape();
        path.forEach(path => {
          p5.stroke(path.color);
          p5.strokeWeight(path.weight);
          p5.vertex(path.x, path.y);
        });
        p5.endShape();
      });
    }

    if (clear) {
      socket.emit('clear', null);

      p5.clear();

      paths.splice(0);
      shapes.splice(0);

      p5.background(255);

      if (!paths || paths.length === 0) {
        setClear(false);
        setBrush(null);
      }
    }
  }

  const mousePressed = (p5) => {
    if (brush === 'pen') {
      socket.emit('paths', currentPath);

      currentPath = [];

      paths.push(currentPath);

    } else if (
      brush === 'circle'
      || brush === 'rectangle'
      || brush === 'triangle'
    ) {
      currentShape = {
        x: p5.mouseX,
        y: p5.mouseY,
      }
    }
  }


  const mouseReleased = (p5) => {
    p5.strokeWeight(stroke);
    p5.stroke(color);


    if (currentShape) {
      currentShape.endX = p5.mouseX;
      currentShape.endY = p5.mouseY;

      currentShape.width = Math.abs(currentShape.endX - currentShape.x);
      currentShape.height = Math.abs(currentShape.endY - currentShape.y);

      currentShape.color = color;
      currentShape.stroke = stroke;

      p5.strokeWeight(stroke);
      p5.stroke(color);

      if (brush === "rectangle") {
        shapes.push(currentShape);
        if (currentShape.y < currentShape.endY) {
          p5.rect(currentShape.x, currentShape.y, currentShape.width, currentShape.height);
        } else {
          p5.rect(currentShape.endX, currentShape.endY, currentShape.width, currentShape.height);
        }
      } else if (brush === "circle") {
        currentShape.diameter = currentShape.width;
        shapes.push(currentShape);
        if (currentShape.y < currentShape.endY) {
          p5.circle(currentShape.x + (currentShape.width / 2), currentShape.y + (currentShape.height / 2), currentShape.width);
        } else {
          p5.circle(currentShape.endX + (currentShape.width / 2), currentShape.endY + (currentShape.height / 2), currentShape.width);
        }
      } else if (brush === "triangle") {
        shapes.push(currentShape);

        if (currentShape.y < currentShape.endY) {
          p5.triangle(
            currentShape.x,
            currentShape.y + currentShape.height,
            currentShape.x + currentShape.width / 2,
            currentShape.y,
            currentShape.x + currentShape.width,
            currentShape.y + currentShape.height
          );
        } else {
          p5.triangle(
            currentShape.endX,
            currentShape.endY,
            currentShape.endX + currentShape.width / 2,
            currentShape.endY + currentShape.height,
            currentShape.endX + currentShape.width,
            currentShape.endY
          );
        }
      }
    }
  }

  return (
    <Sketch setup={setup} draw={draw} mousePressed={mousePressed} mouseReleased={mouseReleased} />
  );
}

export default CanvasView;
