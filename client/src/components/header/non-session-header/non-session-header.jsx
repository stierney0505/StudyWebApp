import './non-session-header.css';
import { useEffect, useState } from "react";
import Link from '../../links/link';
import { Menu, LightFilled, AsleepFilled } from "@carbon/icons-react";
import TextField from '../../text-field/text-field';
import InputButton from '../../button/button';
import Logo from './../../../../assets/logo.svg'

const NoSessionHeader = () => {

    const [darkMode, setDarkMode] = useState("");
    const [searchValue, setSearchValue] = useState('');
    const [mobileNavDisplay, setMobileNavDisplay] = useState(false);
    
    let mobile_header_menu = document.getElementById('mobile-hrefs');

    useEffect(() => {
        let darkModeValue = localStorage.getItem("darkMode");

        if (!darkModeValue){
            localStorage.setItem('darkMode', false);
            setDarkMode(false);
        } else {
            setDarkMode(darkModeValue);
        }

        document.body.setAttribute('data-theme', `${darkModeValue}`);

    }, []);

    const openMenu = () => {
        // mobile_header_menu.style.display = "block";
        setMobileNavDisplay(true);
    }

    const closeMenu = () => {
        mobile_header_menu.style.display = "none";
        setMobileNavDisplay(false);
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("darkMode", darkMode);
        document.body.setAttribute('data-theme', `${darkMode}`);


    }


    return (
        <div className='container-header'>
            <div className='left-header'>
                <img src={Logo} alt="Study Web App Logo" width={130}/>
            </div>
            <div className='right-header'>
                <TextField fieldId="search-box" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search Sets" />
                <Link href="/login" id="log-in-link" underline={true} >Log In</Link>
                <InputButton text={"Get Started"} URL="/create-account" id="sign-up-button"/>
                <Link href="#" id="toggle-dark-mode" onClick={toggleDarkMode}>
                    { !darkMode ? <AsleepFilled size={25}/> : <LightFilled size={25}/>}
                </Link>
            </div>
            <div className='hamburger-menu'>
                <Link href="#" id="hamburger-icon" onClick={openMenu}><Menu size={25} /></Link>
            </div>
        
            {/* For Mobile */}
            <div id="mobile-hrefs" style={{ 'display': `${mobileNavDisplay == true ? 'block' : 'none' }`}}>
                <div className="close-button-container">
                    <button id="close-menu-button" onClick={closeMenu}><h1>✕</h1></button>
                </div>
                <div className="content-container">
                    <Link href="/"><h1>Study Web App</h1></Link>
                    <div className="action-buttons-responsive">
                        <Link href="/login" id="log-in-link-resp" underline={true} >Log In</Link>
                        <InputButton text={"Get Started"} URL="/create-account" id="sign-up-button"/>
                    </div>
                    <TextField fieldId="search-box-mobile" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search Sets" />
                </div>
            </div>

        </div>

        
    );
}

export default NoSessionHeader;