import styles from './password-successfully-changed.module.css';

import InputButton from '../../../components/button/button';
import { useNavigate } from 'react-router-dom';

const PasswordSuccessfullyChanged = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['screen-container']}>
      <div className={styles['content-container']}>
        <h1 className={[styles.heading, styles['poppins-bold']].join(' ')}>Password Successfully Changed</h1>
        <p className={styles['center-text']}>You may now log in using your new account password.</p>
        <div className={styles['button-line']}>
          <InputButton type={'button'} text={'Back to Login'} onClick={() => navigate('/login')} />
        </div>
      </div>
    </div>
  );
}

export default PasswordSuccessfullyChanged;