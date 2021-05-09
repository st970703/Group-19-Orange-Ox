import styles from './SmallScreenMsg.module.css';
import { Link } from 'react-router-dom';

// if the user has too small a screen, this component is rendered
function SmallScreenMsg() {

    return (
        <div className={styles.disabled}>
            <h1>Uh Oh!</h1>
            <p>Virtual Playground is not available for a screen this small 😥</p>
            <p>Please use a device with a larger screen!</p>
            <Link to='/'>Return to Home</Link>
        </div>
    );
}

export default SmallScreenMsg;