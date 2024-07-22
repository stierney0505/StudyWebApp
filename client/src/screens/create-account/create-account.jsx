import { useId, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import styles from './create-account.module.css';

import TextField from '../../components/text-field/text-field';
import Button from '../../components/button/button';
import Link from '../../components/links/link';

const CreateForm = () => {
  const id = useId();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  function createAccount(event) {
    event.preventDefault();
    axios.post(`${import.meta.env.VITE_SERVER_URI}/api/user`, form)
      .then(function (response) {
        if (response.data.success) {
          navigate('/dashboard')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Helmet>
          <title>Create Account</title>
      </Helmet>
      <h1 className={ [styles.heading, styles['poppins-bold']].join(' ') }>Create an Account</h1>
      <form method='post' onSubmit={createAccount} >
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
        <div className={styles['form-line']}>
          <TextField
            fieldId={id + '-password'}
            text={'Password'}
            name={id + '-password'}
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
            name={id + '-confirmPassword'}
            type={'password'}
            value={form.confirmPassword}
            onChange={e => setForm({
              ...form,
              confirmPassword: e.target.value
            })}
          />
        </div>
        <div className={styles['login-link-line']}>
          <p className={styles['login-text']}>Already have an account?</p>
          <Link href={'/login'} underline={true}>Click here!</Link>
        </div>
        <div className={styles['button-line']}>
          <Button type={'submit'} text={'Submit'} />
        </div>
      </form>
    </>
  );
};

const CreateAccount = () => (
  <div className={styles['screen-container']}>
    <div className={styles['form-container']}>
      <CreateForm />
    </div>
  </div>
);

export default CreateAccount;