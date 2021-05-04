import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaSave, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import styles from './Canvas.module.css';
import CanvasView from './components/CanvasView';
import { colors, brushes } from './config/CanvasConfig';
import { CanvasContext } from './context/CanvasContextProvider';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


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
    setWeight
  } = useContext(CanvasContext);

  const [openSBar, setOpenSBar] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSBar(false);
  };

  const canvasWidth = 960;
  const canvasHeight = 720;

  function handleClear() {
    if (!isCanvasBlank()) {
      setClear(true);
      emitData('clear');
    } else {
      setOpenSBar(true);
    }
  }

  function handleSave() {
    if (!isCanvasBlank()) {
      setSave(true);
    } else {
      setOpenSBar(true);
    }
  }

  function handleSetBrush(brush_i) {
    setBrush(brush_i.brushType);
    setWeight(brush_i.weight);
  }

  return (
    <div className={styles.canvas}>
      <Snackbar open={openSBar} autoHideDuration={9000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Warning: You can NOT save or clear an empty canvas!
        </Alert>
      </Snackbar>
      <div className={styles.disabled}>
        <h1>Uh Oh!</h1>
        <p>Virtual Playground is not available for a screen this small</p>
        <p>Please use a device with a larger screen!</p>
        <Link to='/'>Return to Home</Link>
      </div>
      <div className={styles.topInterface}>
        <div className={styles.toolbar}>
          <button className={styles.toolbarButton}
            onClick={() => handleSave()}>
            <FaSave className={styles.toolbarButtonIcon} />
          </button>
          <button className={styles.toolbarButton}
            onClick={() => handleClear()}>
            <FaRegTrashAlt className={styles.toolbarButtonIcon} />
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
                {brush_i.icon}
              </div>
            ))}
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