import { useState } from "react";
import TextField from "../../components/text-field/text-field";
import { LTxt, MTxt } from "../../components/text/text";
import InputButton from "../../components/button/button";
import './login-page.css';

const LoginPage = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <div className="login-container">
                <form action="" className="login-form">
                    <LTxt id="header-main">Study Web App</LTxt>
                    <MTxt id="header-secondary">Log in</MTxt>
                    <div className="login-fields">
                        <TextField
                            id="lg-username-id"
                            fieldId={'lg-username'} 
                            text={'Username'}
                            name={'lg-username'}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            fieldId={'lg-password'}  
                            text={'Password'}
                            name={'lg-password'}
                            type={'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <InputButton id="submit-button" text="Log In"/>
                </form>
            </div>
        </>
    )
}

export default LoginPage;