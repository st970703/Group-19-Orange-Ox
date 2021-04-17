import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSave, FaCheck } from 'react-icons/fa';
import styles from './Canvas.module.css';
import CanvasView from './components/CanvasView';
import { colors, brushes } from './config/CanvasConfig';
import { CanvasContext } from './context/CanvasContextProvider';

function Canvas() {
  const {
    emitData,
    setSave,
    setClear,
    isCanvasBlank,
    color,
    setColor,
    brush,
    setBrush,
    setWeight,
  } = useContext(CanvasContext);

  const canvasWidth = 960;
  const canvasHeight = 720;

  function handleClear() {
    if (!isCanvasBlank()) {
      setClear(true);
      emitData('clear');
    }
  }

  function handleSave() {
    if (!isCanvasBlank()) {
      setSave(true);
    }
  }

  function handleSetBrush(brush_i) {
    setBrush(brush_i.brushType);
    setWeight(brush_i.weight);
  }

  return (
    <div className={styles.canvas}>
      <div className={styles.disabled}>
        <h1>Uh Oh!</h1>
        <p>Virtual Playground is not available for a screen this small</p>
        <p>Please use a device with a larger screen!</p>
        <Link to='/'>Return to Home</Link>
      </div>
      <div className={styles.topInterface}>
        <div className={styles.toolbar}>
          <button className={styles.toolbarButton}>
            <FaHome className={styles.toolbarButtonIcon} />
          </button>

          <button className={styles.toolbarButton}
            onClick={() => handleSave()}>

            <FaSave className={styles.toolbarButtonIcon} />
          </button>
          <button className={styles.toolbarButton}
            onClick={() => handleClear()}>
            Clear
          </button>
        </div>

        <CanvasView canvasWidth={canvasWidth}
          canvasHeight={canvasHeight} />

        <div className={styles.brushbar}>
          <div className={styles.brushes}>
            {brushes.map((brush_i, i) => (
              <div className={styles.brush} key={i}
                onClick={() => handleSetBrush(brush_i)}
                style={brush === brush_i.brushType ? { boxShadow: "0px 0px 0px 4px black inset" } : {}}>
                <p>{brush_i.brushType}</p>
              </div>
            ))}
          </div>

          <div className={styles.stickersButton}>
            <p>Stickers</p>
          </div>
        </div>
      </div>

      <div className={styles.bottomInterface}>
        {colors.map((color_i, i) => (
          <div className={styles.color} key={i}
            style={{ backgroundColor: (color_i.hex) }}
            onClick={() => setColor(color_i.hex)}>
            {color === color_i.hex && (
              <FaCheck className={styles.selectedColor} />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Canvas;