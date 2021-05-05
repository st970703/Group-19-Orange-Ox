import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import { FaSave, FaRegTrashAlt } from 'react-icons/fa';
import { brushes } from '../config/CanvasConfig';
import Tooltip from '@material-ui/core/Tooltip';
import { capitalise } from '../config/helperFunctions';
import { CanvasContext } from '../context/CanvasContextProvider';
import styles from './Toolbar.module.css';


function Toolbar({ handleClear, handleSave }) {
    const {
        brush,
        setBrush,
        setWeight
    } = useContext(CanvasContext);

    function handleSetBrush(brush_i) {
        setBrush(brush_i.brushType);
        setWeight(brush_i.weight);
    }

    return (
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
    );
}

export default Toolbar;