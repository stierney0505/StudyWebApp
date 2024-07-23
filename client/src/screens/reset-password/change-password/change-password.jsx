import { useId, useState } from 'react';

import styles from './change-password.module.css';

import TextField from '../../../components/text-field/text-field';
import InputButton from '../../../components/button/button';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
  const navigate = useNavigate();

  const id = useId();
  const [form, setForm] = useState({
    password: '',
    confirmPassword: ''
  });

  function createAccount(event) {
    event.preventDefault();
    console.log(form);
    navigate('/password-successfully-changed');
  }

  return (
    <>
      <h1 className={ [styles.heading, styles['poppins-bold']].join(' ') }>Change Password</h1>
      <form method='post' onSubmit={createAccount} >
        <div className={styles['form-line']}>
          <TextField
            fieldId={id + '-password'}
            text={'New Password'}
            name={'password'}
            type={'password'}
            value={form.password}
            onChange={e => setForm({
              ...form,
              password: e.target.value
            })}
          />
        </div>
        <div className={styles['form-line']}>
          <TextField
            fieldId={id + '-confirmPassword'}
            text={'Confirm Password'}
            name={'confirm-password'}
            type={'password'}
            value={form.confirmPassword}
            onChange={e => setForm({
              ...form,
              confirmPassword: e.target.value
            })}
          />
        </div>
        <div className={styles['button-line']}>
          <InputButton type={'button'} text={'Back to Login'} onClick={() => navigate('/login')} />
          <InputButton type={'submit'} text={'Submit'} />
        </div>
      </form>
    </>
  );
};

const ChangePassword = () => (
  <div className={styles['screen-container']}>
    <div className={styles['form-container']}>
      <ChangePasswordForm />
    </div>
  </div>
);

export default ChangePassword;