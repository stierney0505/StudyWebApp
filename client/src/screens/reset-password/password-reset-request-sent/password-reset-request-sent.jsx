import styles from './password-reset-request-sent.module.css';

const PasswordResetRequestSent = () => (
  <div className={styles['screen-container']}>
    <div className={styles['content-container']}>
      <h1 className={ [styles.heading, styles['poppins-bold']].join(' ') }>Password Reset Request Sent</h1>
      <p className={ [styles['center-text'], styles['space-below']].join(' ') }>We have sent an email to the provided address.</p>
      <p className={styles['center-text']}>To continue resetting your password, please follow the instructions in the sent email.</p>
    </div>
  </div>
);

export default PasswordResetRequestSent;