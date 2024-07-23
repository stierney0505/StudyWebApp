import { useId, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import styles from './modify-account.module.css';

import TextField from '../../components/text-field/text-field';
import InputButton from '../../components/button/button';

const ModifyForm = () => {
  const id = useId();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fname: '',
    lname: '',
    email: '',
  });

  function modifyAccount(event) {
    event.preventDefault();
    console.log(form);
  }

  return (
    <>
      <Helmet>
          <title>Modify Account</title>
      </Helmet>
      <h1 className={ [styles.heading, styles['poppins-bold']].join(' ') }>Modify Account Details</h1>
      <form method='post' onSubmit={modifyAccount} >
        <div className={ [styles['name-group'], styles['form-line']].join(' ') }>
          <TextField
            fieldId={id + '-fname'}
            text={'First Name'}
            name={id + '-fname'}
            type={'text'}
            value={form.fname}
            onChange={e => setForm({
              ...form,
              fname: e.target.value
            })}
          />
          <TextField
            fieldId={id + '-lname'}
            text={'Last Name'}
            name={id + '-lname'}
            type={'text'}
            value={form.lname}
            onChange={e => setForm({
              ...form,
              lname: e.target.value
            })}
          />
        </div>
        <div className={styles['form-line']}>
          <TextField
            fieldId={id + '-email'}
            text={'Email'}
            name={id + '-email'}
            type={'email'}
            value={form.email}
            onChange={e => setForm({
              ...form,
              email: e.target.value
            })}
          />
        </div>
        <div className={styles['reset-line']}>
          <p className={styles['reset-text']}>Change (Reset) Password: </p>
          <InputButton type='button' text={'Reset Password'} onClick={() => navigate('/request-password-reset')} />
        </div>
        <div className={styles['button-line']}>
          <InputButton type={'button'} text={'Go Back'} onClick={() => navigate(-1)} />
          <InputButton type={'submit'} text={'Submit'} />
        </div>
      </form>
    </>
  );
};

const ModifyAccount = () => (
  <div className={styles['screen-container']}>
    <div className={styles['form-container']}>
      <ModifyForm />
    </div>
  </div>
);

export default ModifyAccount;