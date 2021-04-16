import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaHome, FaSave, FaCheck } from 'react-icons/fa';
import styles from './Canvas.module.css';
import CanvasView from './components/CanvasView';
import { colors, brushes } from './config/CanvasConfig';
import { CanvasContext } from './context/CanvasContextProvider';

function Canvas() {
  const { userId, canvasId } = useParams();
  const [selectedColor, setSelectedColor] = useState(
    colors.find(color => color.name === 'black').hex
  );
  const [selectedBrush, setSelectedBrush] = useState('pen');

  const {
    setSave,
    setClear,
    emitData,
    isCanvasBlank
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
          canvasHeight={canvasHeight}
          color={selectedColor}
          stroke={brushes.find(brush => brush.brushType === selectedBrush).stroke}
          brush={selectedBrush}
        />

        <div className={styles.brushbar}>
          <div className={styles.brushes}>
            {brushes.map((brush, i) => (
              <div className={styles.brush} key={i} onClick={() => setSelectedBrush(brush.brushType)} style={selectedBrush === brush.brushType ? { boxShadow: "0px 0px 0px 4px black inset" } : {}}>
                <p>{brush.brushType}</p>
              </div>
            ))}
          </div>

          <div className={styles.stickersButton}>
            <p>Stickers</p>
          </div>
        </div>
      </div>

      <div className={styles.bottomInterface}>
        {colors.map((color, i) => (
          <div className={styles.color} key={i} style={{ backgroundColor: (color.hex) }} onClick={() => setSelectedColor(color.hex)}>
            {selectedColor === color.hex && (
              <FaCheck className={styles.selectedColor} />
            )}
          </div>
        ))}

      </div>
    </div>
  );
}

export default Canvas;