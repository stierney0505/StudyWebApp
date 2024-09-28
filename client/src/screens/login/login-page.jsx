import OutlinedTextField from "../../components/outlined-text-field/outlined-text-field";
import { LTxt, MTxt, STxt } from "../../components/text/text";
import InputButton from "../../components/button/button";
import styles from './login-page.module.css';
import Link from "../../components/links/link";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const onSubmit = (data) => {
    let requestData = {
      "username": data.username,
      "password": data.password
    };

    //make axios request
    axios.post("http://localhost:8080/api/auth", requestData)
      .then(function (response) {
        if (response.data.success) {
          navigate('/dashboard')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <div className={styles['login-container']}>
        <form method="" onSubmit={handleSubmit(onSubmit)} className={styles['login-form']}>
          <LTxt id={styles['header-main']}>Study Web App</LTxt>
          <MTxt id={styles['header-secondary']}>Log in</MTxt>
          <div className={styles['login-fields']}>
            <div className={styles['text-field']}>
              <OutlinedTextField
                fieldId={'lg-username'}
                text="Username"
                name="username"  // Update this to match the register name
                type="text"
                register={register('username', {
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Username must be at least 3 characters long' },
                  maxLength: { value: 22, message: 'Username cannot exceed 22 characters' }
                })}
                isError={errors.username}
              />
              {(errors.username) && <STxt className={styles['error-text']}>{errors.username.message}</STxt>}
            </div>
            <div className={styles['text-field']}>
              <OutlinedTextField
                fieldId={'lg-password'}
                text="Password"
                name="password"
                type="password"
                register={register('password', {
                  required: 'Password is required',
                  minLength: { value: 3, message: 'Password must be at least 3 characters long' },
                  maxLength: { value: 22, message: 'Password cannot exceed 22 characters' }
                })}
                isError={errors.password}
              />
              {(errors.password) && <STxt className={styles['error-text']}>{errors.password.message}</STxt>}
            </div>
          </div>
          <InputButton id={styles['submit-button']} text="Log In" type="submit" />
          <STxt id={styles['or-header']}>─── Or ───</STxt>
          <Link href="/create-account" id={styles['create-account-link']}><STxt>Don&apos;t have an account? Create one</STxt></Link>
        </form>
      </div>
    </>
  )
}

export default LoginPage;
