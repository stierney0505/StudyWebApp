import styles from './password-successfully-changed.module.css';

import Button from '../../../components/button/button';

const PasswordSuccessfullyChanged = () => (
  <div className={styles['screen-container']}>
    <div className={styles['content-container']}>
      <h1 className={ [styles.heading, styles['poppins-bold']].join(' ') }>Password Successfully Changed</h1>
      <p className={styles['center-text']}>You may now log in using your new account password.</p>
      <div className={styles['button-line']}>
        <Button type={'button'} text={'Back to Login'} URL={'/login'} />
      </div>
    </div>
  </div>
);

export default PasswordSuccessfullyChanged;