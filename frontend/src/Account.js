import React, { useState } from 'react';
import { useParams } from 'react-router';
import styles from './Account.module.css';

function Account() {
  const {userId} = useParams();
  const [currTab, setCurrTab] = useState('account');

  return (
    <div className={styles.account}>
    {
      // TODO: Make each tab clickable and change currTab
      // TODO: Implement other tabs
    }
      <div className={styles.navbar}>
        <div className={currTab === 'account' ? styles.navbarItemSelected : styles.navbarItem}>
          <p>Account</p>
        </div>

        <div className={styles.navbarItem}>
          <p>Friends</p>
        </div>

        <div className={styles.navbarItem}>
          <p>About</p>
        </div>

        <div className={styles.navbarItem}>
          <p>Log Out</p>
        </div>

      </div>

      {currTab === 'account' && (
        <div className={styles.content}>
          <div className={styles.form}>
            <div className={styles.formPair}>
              <label htmlFor='email'>Email</label>
              <input className={styles.formInput} type='email' id='email' disabled placeholder='example@example.com'></input>
            </div>

            <div className={styles.formPair}>
              <label htmlFor='newPassword'>New Password</label>
              <input className={styles.formInput} type='password' id='newPassword'></input>
            </div>

            <div className={styles.formPair}>
              <label htmlFor='confirmNewPassword'>Confirm New Password</label>
              <input className={styles.formInput} type='password' id='confirmNewPassword'></input>
            </div>
          </div>

          <button type='submit' className={styles.changePassword}>Change Password</button>
        </div>
      )}


    </div>
  );
}

export default Account;