import { useId, useState } from 'react';

import styles from './request-password-reset.module.css';

import TextField from '../../../components/text-field/text-field';
import Button from '../../../components/button/button';
import { useNavigate } from 'react-router-dom';

const RequestResetForm = () => {
  const navigate = useNavigate();

  const id = useId();
  const [email, setEmail] = useState('');
  
  function requestReset(event) {
    event.preventDefault();
    console.log(email);
    navigate('/password-reset-request-sent');
  }

  return (
    <>
      <h1 className={ [styles.heading, styles['poppins-bold']].join(' ') }>Request Password Reset</h1>
      <form method='post' onSubmit={requestReset} >
        <div className={styles['form-line']}>
          <TextField
            fieldId={id + '-email'}
            text={'Email'}
            name={'email'}
            type={'email'}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className={styles['button-line']}>
          <Button type={'button'} text={'Back to Login'} URL={'/login'} />
          <Button type={'submit'} text={'Submit'} />
        </div>
      </form>
    </>
  );
};

const RequestPasswordReset = () => (
  <div className={styles['screen-container']}>
    <div className={styles['form-container']}>
      <RequestResetForm />
    </div>
  </div>
);

export default RequestPasswordReset;