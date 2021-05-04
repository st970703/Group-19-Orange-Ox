import { FaPen, FaPaintBrush, FaPaintRoller, FaEraser, FaRegCircle, FaRegSquare } from 'react-icons/fa';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import styles from '../views/Canvas.module.css';

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
        icon: <FaPen className={styles.toolbarButtonIcon} />,
        weight: 3,
    },
    {
        brushType: 'large',
        icon: <FaPaintRoller className={styles.toolbarButtonIcon} />,
        weight: 16
    },
    {
        brushType: 'small',
        icon: <FaPaintBrush className={styles.toolbarButtonIcon} />,
        weight: 8
    },
    {
        brushType: 'circle',
        icon: <FaRegCircle className={styles.toolbarButtonIcon} />,
        weight: 3
    },
    {
        brushType: 'rectangle',
        icon: <FaRegSquare className={styles.toolbarButtonIcon} />,
        weight: 3
    },
    {
        brushType: 'triangle',
        icon: <ChangeHistoryIcon style={{ fontSize: 50 }} />,
        weight: 3
    },
    {
        brushType: 'eraser',
        icon: <FaEraser className={styles.toolbarButtonIcon} />,
        weight: 9
    },
];

export { colors, brushes };