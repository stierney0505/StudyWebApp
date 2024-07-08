import { useId, useState } from 'react';

import './create-account.css';

import TextField from '../../components/text-field/text-field';
import Button from '../../components/button/button';
import { Link } from 'react-router-dom';

const CreateForm = () => {
  const id = useId();

  const [form, setForm] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  function createAccount(event) {
    event.preventDefault();
    console.log(form);
  }

  return (
    <>
      <h1 className='heading'>Create an Account</h1>
      <form method='post' onSubmit={createAccount} >
        <div className='name-group form-line'>
          <TextField
            fieldId={id + '-fname'}
            label={'First Name'}
            name={'fname'}
            inputType={'text'}
            placeholder={'Enter your first name'}
            value={form.fname}
            onChange={e => setForm({
              ...form,
              fname: e.target.value
            })}
          />
          <TextField
            fieldId={id + '-lname'}
            label={'Last Name'}
            name={'lname'}
            inputType={'text'}
            placeholder={'Enter your last name'}
            value={form.lname}
            onChange={e => setForm({
              ...form,
              lname: e.target.value
            })}
          />
        </div>
        <div className='form-line'>
          <TextField
            fieldId={id + '-email'}
            label={'Email'}
            name={'email'}
            placeholder={'Enter your email'}
            inputType={'email'}
            value={form.email}
            onChange={e => setForm({
              ...form,
              email: e.target.value
            })}
          />
        </div>
        <div className='form-line'>
          <TextField
            fieldId={id + '-password'}
            label={'Password'}
            name={'password'}
            inputType={'password'}
            placeholder={'Enter your password'}
            value={form.password}
            onChange={e => setForm({
              ...form,
              password: e.target.value
            })}
          />
        </div>
        <div className='form-line'>
          <TextField
            fieldId={id + '-confirmPassword'}
            label={'Confirm Password'}
            name={'confirm-password'}
            inputType={'password'}
            placeholder={'Confirm your password'}
            value={form.confirmPassword}
            onChange={e => setForm({
              ...form,
              confirmPassword: e.target.value
            })}
          />
        </div>
        <div className='login-link-line'>
          <p className='login-text'>Already have an account?</p>
          <Link to={'/login'} className='login-link'>Click here!</Link>
        </div>
        <div className='button-line'>
          <Button type={'submit'} text={'Submit'} />
        </div>
      </form>
    </>
  );
};

const CreateAccount = () => (
  <div className='screen-container'>
    <div className='form-container'>
      <CreateForm />
    </div>
  </div>
);

export default CreateAccount;