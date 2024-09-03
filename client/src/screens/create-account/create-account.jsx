/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "_" }] */

import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './create-account.module.css';

import OutlinedTextField from '../../components/outlined-text-field/outlined-text-field';
import InputButton from '../../components/button/button';
import Link from '../../components/links/link';

const CreateForm = () => {
  const id = useId();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  function onSubmit(data) {
    const { confirmPassword: _, ...submissionData } = data;
    console.log(submissionData);

    axios.post(
      `${import.meta.env.VITE_SERVER_URI}/api/users`,
      submissionData,
      { withCredentials: true }
    )
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
      <h1 className={[styles.heading, styles['poppins-bold']].join(' ')}>Create an Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className={[styles['name-group'], styles['form-line']].join(' ')}>
          <div className={styles['text-field']}>
            <OutlinedTextField
              fieldId={id + '-firstName'}
              name="firstName"
              text="First Name"
              type="text"
              register={register('firstName', {
                required: 'First Name is required',
                minLength: { value: 3, message: 'First Name must be at least 3 characters long', },
                maxLength: { value: 22, message: 'First Name cannot exceed 22 characters', },
              })}
              isError={errors.firstName}
            />
            {(errors.firstName) && <p className={styles['error-text']}>{errors.firstName.message}</p>}
          </div>
          <div className={styles['text-field']}>
            <OutlinedTextField
              fieldId={id + '-lastName'}
              name="lastName"
              text="Last Name"
              type="text"
              register={register('lastName', {
                required: 'Last Name is required',
                minLength: { value: 3, message: 'Last Name must be at least 3 characters long', },
                maxLength: { value: 22, message: 'Last Name cannot exceed 22 characters', },
              })}
              isError={errors.lastName}
            />
            {(errors.lastName) && <p className={styles['error-text']}>{errors.lastName.message}</p>}
          </div>
        </div>
        <div className={styles['form-line']}>
          <div className={styles['text-field']}>
            <OutlinedTextField
              fieldId={id + '-email'}
              name="email"
              text="Email"
              type="email"
              register={register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Entered value does not match email format',
                },
              })}
              isError={errors.email}
            />
            {(errors.email) && <p className={styles['error-text']}>{errors.email.message}</p>}
          </div>
        </div>
        <div className={styles['form-line']}>
          <div className={styles['text-field']}>
            <OutlinedTextField
              fieldId={id + '-password'}
              text="Password"
              name="password"
              type="password"
              register={register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                validate: {
                  atLeastOneDigit: (value) => {
                    return /\d/.test(value) || 'Password must contain at least 1 digit';
                  },
                  atLeastOneLetter: (value) => {
                    return /[a-zA-Z]/.test(value) || 'Password must contain at least 1 letter';
                  },
                  atLeastOneSpecial: (value) => {
                    return /\W/.test(value) || 'Password must contain at least 1 special character';
                  },
                },
              })}
              isError={errors.password}
            />
            {(errors.password) && <p className={styles['error-text']}>{errors.password.message}</p>}
          </div>
        </div>
        <div className={styles['form-line']}>
          <div className={styles['text-field']}>
            <OutlinedTextField
              fieldId={id + '-confirmPassword'}
              text="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: {
                  matchPassword: (value, formValues) => {
                    return value === formValues.password || 'Confirm Password must match Password';
                  },
                },
              })}
              isError={errors.confirmPassword}
            />
            {(errors.confirmPassword) && <p className={styles['error-text']}>{errors.confirmPassword.message}</p>}
          </div>
        </div>
        <div className={styles['login-link-line']}>
          <p className={styles['login-text']}>Already have an account?</p>
          <Link href="/login" underline={true}>Click here!</Link>
        </div>
        <div className={styles['button-line']}>
          <InputButton type="submit" text="Create" />
        </div>
      </form>
    </>
  );
};

const CreateAccount = () => (
  <>
    <Helmet>
      <title>Create Account</title>
    </Helmet>
    <div className={styles['screen-container']}>
      <div className={styles['form-container']}>
        <CreateForm />
      </div>
    </div>
  </>
);

export default CreateAccount;
