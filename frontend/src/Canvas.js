import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHome, FaSave, FaCheck } from 'react-icons/fa';
import styles from './Canvas.module.css';
import CanvasView from './components/CanvasView';
import { colors, brushes } from './config/CanvasConfig';

function Canvas() {
  const { userId, canvasId } = useParams();
  const [selectedColor, setSelectedColor] = useState(
    colors.find(color => color.name === 'black').hex
  );
  const [selectedBrush, setSelectedBrush] = useState('pen');
  const [selectClear, setSelectClear] = useState(false);

  const canvasWidth = 960;
  const canvasHeight = 720;

  return (
    <div className={styles.canvas}>
      <div className={styles.topInterface}>
        <div className={styles.toolbar}>
          <button className={styles.toolbarButton}>
            <FaHome className={styles.toolbarButtonIcon} />
          </button>
          <button className={styles.toolbarButton}>
            <FaSave className={styles.toolbarButtonIcon} />
          </button>
        </div>

        <CanvasView canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          color={selectedColor}
          stroke={3}
          clear={selectClear}
          setClear={setSelectClear}
          brush={selectedBrush}
          setBrush={setSelectedBrush}
        />

        <div className={styles.brushbar}>
          <div className={styles.brushes}>
            {brushes.map(brush => (
              <div className={styles.brush} onClick={() => setSelectedBrush(brush.brushType)} style={selectedBrush === brush.brushType ? { boxShadow: "0px 0px 0px 4px black inset" } : {}}>
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
        {colors.map(color => (
          <div className={styles.color} style={{ backgroundColor: (color.hex) }} onClick={() => setSelectedColor(color.hex)}>
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