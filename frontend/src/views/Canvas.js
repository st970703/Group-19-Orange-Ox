import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaSave, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import styles from './Canvas.module.css';
import CanvasView from '../components/CanvasView';
import { colors, brushes } from '../config/CanvasConfig';
import { CanvasContext } from '../context/CanvasContextProvider';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';
import { useMediaQuery } from 'react-responsive';
import Box from '@material-ui/core/Box';


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

  function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const canvasWidth = 960;
  const canvasHeight = canvasWidth / (16 / 9);

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const SmallScreenMsg = <div className={styles.disabled}>
    <h1>Uh Oh!</h1>
    <p>Virtual Playground is not available for a screen this small 😥</p>
    <p>Please use a device with a larger screen!</p>
    <Link to='/'>Return to Home</Link>
  </div>;

  return (
    <>
      <Snackbar open={openSBar} autoHideDuration={9000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Warning: You can NOT save or clear an empty canvas! 😥
         </Alert>
      </Snackbar>

      {isMobile ? SmallScreenMsg :
        <>
          <Box display="flex" flexDirection="row">

            <Box display="flex" flexDirection="column">

              <CanvasView canvasWidth={canvasWidth}
                canvasHeight={canvasHeight} />

              <Box display="flex" flexDirection="row"
                justifyContent="center">
                {colors.map((color_i, i) => (
                  <Tooltip title={capitalise(color_i.name)}
                    key={capitalise(color_i.name) + "_tooltip"}>
                    <div className={styles.color} key={i}
                      style={{ backgroundColor: (color_i.hex) }}
                      onClick={() => setColor(color_i.hex)}>
                      {color === color_i.hex && (
                        <FaCheck className={styles.selectedColor} />
                      )}
                    </div>
                  </Tooltip>
                ))}
              </Box>

            </Box>

            <Box display="flex" flexDirection="column" justifyContent="center">
              <Box display="flex" flexDirection="row">
                <Tooltip title="Save">
                  <button className={styles.toolbarButton}
                    onClick={() => handleSave()}>
                    <FaSave className={styles.toolbarButtonIcon} />
                  </button>
                </Tooltip>

                <Tooltip title="Clear">
                  <button className={styles.toolbarButton}
                    onClick={() => handleClear()}>
                    <FaRegTrashAlt className={styles.toolbarButtonIcon} />
                  </button>
                </Tooltip>
              </Box>

              <div className={styles.brushbar}>
                <div className={styles.brushes}>
                  {brushes.map((brush_i, i) => (
                    <Tooltip title={capitalise(brush_i.brushType)}
                      key={capitalise(brush_i.brushType) + "_tooltip"}>
                      <div className={styles.brush} key={i}
                        onClick={() => handleSetBrush(brush_i)}
                        style={brush === brush_i.brushType ?
                          { boxShadow: "0px 0px 0px 4px black inset" } : {}}>
                        {brush_i.icon}
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>

            </Box>

          </Box>

        </>}
    </>
  );
}

export default Canvas;