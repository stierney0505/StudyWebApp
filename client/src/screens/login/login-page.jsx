import TextField from "../../components/text-field/text-field";
import { LTxt, MTxt, STxt } from "../../components/text/text";
import InputButton from "../../components/button/button";
import './login-page.css';
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

    const onSubmit = (data) => {

        let requestData = {
            "username": data.username,
            "password": data.password
        };

        //make axios request
        axios.post("http://localhost:8080/api/auth", requestData)
        .then (function (response) {
            if (response.data.success){
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
            <div className="login-container">
                <form method="" onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <LTxt id="header-main">Study Web App</LTxt>
                    <MTxt id="header-secondary">Log in</MTxt>
                    <div className="login-fields">
                        <TextField
                            id={errors.username ? 'lg_username_id_error' : 'lg_username_id'}
                            fieldId={errors.username ? 'lg-username-error' : 'lg-username'}
                            text="Username"
                            name="username"  // Update this to match the register name
                            type="text"
                            register={register('username', { 
                                required: 'Username is Required',
                                minLength: { value: 3, message: 'Username must be at least 3 characters long' },
                                maxLength: { value: 22, message: 'Username cannot exceed 22 characters' } 
                            })}
                        />
                        <TextField
                            id={errors.password ? 'lg_password_id_error' : ''}
                            fieldId={errors.password ? 'lg-password-error' : 'lg-password'}  
                            text={'Password'}
                            name="password"
                            type={'password'}
                            register={register('password', { 
                                required: 'Password is Required',
                                minLength: { value: 3, message: 'Password must be at least 3 characters long' },
                                maxLength: { value: 22, message: 'Password cannot exceed 22 characters' }  
                            })}
                        />
                        {(errors.username) && <STxt id="error-text">{errors.username.message}</STxt>}
                        {(errors.password && !errors.username) && <STxt id="error-text">{errors.password.message}</STxt>}
                    </div>
                    <InputButton id="submit-button" text="Log In"/>
                    <STxt id="or-header">─── Or ───</STxt>
                    <Link href="/create-account" id="create-account-link"><STxt>Don&apos;t have an account? Create one</STxt></Link>

                </form>
            </div>
        </>
    )
}

export default LoginPage;