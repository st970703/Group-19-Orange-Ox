import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import { FaHome, FaSave, FaCheck } from 'react-icons/fa';
import styles from './Canvas.module.css';

function Canvas() {
  const { userId, canvasId } = useParams();
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedBrush, setSelectedBrush] = useState('pen');

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
      brushType: 'square',
      icon: ''
    },
    {
      brushType: 'triangle',
      icon: ''
    }
  ];

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
          {
            // p5.js Canvas will go in here
            // Width: 960px, Height: 720px
          }
        </div>

        <div className={styles.brushbar}>
          <div className={styles.brushes}>
            {brushes.map((brush, i) => (
              <div className={styles.brush} key={i} onClick={() => setSelectedBrush(brush.brushType)} style={selectedBrush === brush.brushType ? {boxShadow: "0px 0px 0px 4px black inset"} : {}}>
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
          <div className={styles.color} key={i} style={{backgroundColor: (color.hex)}} onClick={() => setSelectedColor(color.name)}>
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