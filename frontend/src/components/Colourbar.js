import Box from '@material-ui/core/Box';
import { colors } from '../config/CanvasConfig';
import Tooltip from '@material-ui/core/Tooltip';
import { FaCheck } from 'react-icons/fa';
import { capitalise } from '../config/helperFunctions';
import styles from './Colourbar.module.css';
import { CanvasContext } from '../context/CanvasContextProvider';
import React, { useContext } from 'react';


function Colourbar() {
    const {
        color,
        setColor
    } = useContext(CanvasContext);

    return (
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
    );
}

export default Colourbar;
