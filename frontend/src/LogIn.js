import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import styles from './LogIn.module.css';

function LogIn() {
  const [showSignUp, changeShowSignUp] = useState(false);

  return (
    <div className={styles.login}>
      <h1>Virtual<br></br>Playground</h1>

      <div className={styles.selector}>
        <div className={showSignUp ? styles.option : styles.optionSelected} onClick={() => changeShowSignUp(false)}>
          <p>Log In</p>
        </div>
        <div className={showSignUp ? styles.optionSelected : styles.option} onClick={() => changeShowSignUp(true)}>
          <p>Sign Up</p>
        </div>
      </div>

      <div className={styles.flexSpaceBetween}>
        {showSignUp ? (
          <div className={styles.details}>
            <input type='email' placeholder='Email' className={styles.input}></input>
            <input type='password' placeholder='Password' className={styles.input}></input>
            <input type='password' placeholder='Confirm Password' className={styles.input}></input>
            <button type='submit' className={styles.buttonLogIn}>Sign Up</button>
          </div>
        ) : (
          <div className={styles.details}>
            <input type='email' placeholder='Email' className={styles.input}></input>
            <input type='password' placeholder='Password' className={styles.input}></input>
            <button type='submit' className={styles.buttonLogIn}>Log In</button>
          </div>
        )}

        <div className={styles.useGoogle}>
          <div className={styles.orDivider}>
            <hr className={styles.dividerRule}></hr>
            <p>or</p>
            <hr className={styles.dividerRule}></hr>
          </div>

          <button className={styles.signInWithGoogle}>
            <FaGoogle className={styles.logoGoogle} />
            <p>Sign in with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;