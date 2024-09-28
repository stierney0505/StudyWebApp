import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './modify-account.module.css';

import OutlinedTextField from '../../components/outlined-text-field/outlined-text-field';
import InputButton from '../../components/button/button';

const ModifyForm = () => {
  const id = useId();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  console.log(errors);

  const [isSuccess, setIsSuccess] = useState(undefined);

  axios.get(`${import.meta.env.VITE_SERVER_URI}/api/users/1`, { withCredentials: true })
    .then(function (response) {
      setValue('firstName', response.data.data.firstName);
      setValue('lastName', response.data.data.lastName);
      setValue('email', response.data.data.email);
    })
    .catch(function (error) {
      console.log(error);
    });

  function onSubmit(data) {
    console.log(data);

    axios.put(
      `${import.meta.env.VITE_SERVER_URI}/api/users/1`,
      data,
      { withCredentials: true }
    )
      .then(function (response) {
        if (response.data) {
          setIsSuccess(true);
          console.log('User successfully modified');
        }
      })
      .catch(function (error) {
        setIsSuccess(false);
        console.log(error);
      });
  }

  return (
    <>
      <h1 className={[styles.heading, styles['poppins-bold']].join(' ')}>Modify Account Details</h1>
      {(typeof isSuccess !== 'undefined') && <figure className={isSuccess ? styles['modify-success'] : styles['modify-error']}>
        {isSuccess ? (
          <p>Account details successfully updated!</p>
        ) : (
          <p>Error updating account details.</p>
        )}
      </figure>}
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
              type='email'
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
  <>
    <Helmet>
      <title>Modify Account</title>
    </Helmet>
    <div className={styles['screen-container']}>
      <div className={styles['form-container']}>
        <ModifyForm />
      </div>
    </div>
  </>
);

export default ModifyAccount;
