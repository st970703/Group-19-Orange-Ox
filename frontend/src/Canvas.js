import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import { FaHome, FaSave, FaCheck } from 'react-icons/fa';
import styles from './Canvas.module.css';
import CanvasView from './components/CanvasView';

function Canvas() {
  const { userId, canvasId } = useParams();
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedBrush, setSelectedBrush] = useState('pen');
  const [selectClear, setSelectClear] = useState(false);

  const colors = [
    {
      name: 'red',
      hex: '#FF0000'
    },
    {
      name: 'orange',
      hex: '#FFA500'
    },
    {
      name: 'yellow',
      hex: '#FFFF00'
    },
    {
      name: 'green',
      hex: '#008000'
    },
    {
      name: 'blue',
      hex: '#0000FF'
    },
    {
      name: 'indigo',
      hex: '#4B0082'
    },
    {
      name: 'violet',
      hex: '#EE82EE'
    },
    {
      name: 'black',
      hex: '#000000'
    }
  ];

  const brushes = [
    {
      brushType: 'pen',
      icon: ''
    },
    {
      brushType: 'large',
      icon: ''
    },
    {
      brushType: 'small',
      icon: ''
    },
    {
      brushType: 'paint',
      icon: ''
    },
    {
      brushType: 'eraser',
      icon: ''
    },
    {
      brushType: 'circle',
      icon: ''
    },
    {
      brushType: 'rectangle',
      icon: ''
    },
    {
      brushType: 'triangle',
      icon: ''
    }
  ];

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

        <div className={styles.canvasBoard}>
          <CanvasView canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            color={selectedColor}
            stroke={3}
            clear={selectClear}
            setClear={setSelectClear}
            brush={selectedBrush}
            setBrush={setSelectedBrush}
          />
        </div>

        <div className={styles.brushbar}>
          <div className={styles.brushes}>
            {brushes.map(brush => (
              <div className={styles.brush} onClick={() => setSelectedBrush(brush.brushType)} style={selectedBrush === brush.brushType ? {boxShadow: "0px 0px 0px 4px black inset"} : {}}>
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
          <div className={styles.color} style={{backgroundColor: (color.hex)}} onClick={() => setSelectedColor(color.hex)}>
            {selectedColor === color.name && (
              <FaCheck className={styles.selectedColor}/>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}

export default Canvas;