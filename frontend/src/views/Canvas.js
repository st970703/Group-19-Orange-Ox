import React, { useContext } from 'react';
import CanvasView from '../components/CanvasView';
import { CanvasContext } from '../context/CanvasContextProvider';
import { useMediaQuery } from 'react-responsive';
import Box from '@material-ui/core/Box';
import SmallScreenMsg from '../components/SmallScreenMsg';
import WarningSnackBar from '../components/WarningSnackBar';
import Colourbar from '../components/Colourbar';
import Toolbar from '../components/Toolbar';


function Canvas() {
  const {
    emitData,
    setSave,
    setClear,
    isCanvasBlank
  } = useContext(CanvasContext);

  const [openSBar, setOpenSBar] = React.useState(false);

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

  const canvasWidth = 960;
  const canvasHeight = 529;

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });


  return (
    <>
      <WarningSnackBar openSBar={openSBar} setOpenSBar={setOpenSBar} />

      {isMobile ? <SmallScreenMsg /> :
        <>
          <Box display="flex" flexDirection="row">

            <Box display="flex" flexDirection="column">

              <CanvasView canvasWidth={canvasWidth}
                canvasHeight={canvasHeight} />

              <Colourbar />

            </Box>

            <Toolbar handleClear={handleClear}
              handleSave={handleSave} />

          </Box>

        </>}
    </>
  );
}

export default Canvas;