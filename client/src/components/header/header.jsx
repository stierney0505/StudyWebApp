import './header.css';
import { useState } from "react";
import Link from '../links/link';
import { Settings, UserAvatar, Menu } from "@carbon/icons-react";
import TextField from '../text-field/text-field';
import { LTxt } from '../text/text';

const Header = () => {

    const [searchValue, setSearchValue] = useState('');
    const [mobileNavDisplay, setMobileNavDisplay] = useState(false);
    let mobile_header_menu = document.getElementById('mobile-hrefs');

    const openMenu = () => {
        // mobile_header_menu.style.display = "block";
        setMobileNavDisplay(true);
    }

    const closeMenu = () => {
        mobile_header_menu.style.display = "none";
        setMobileNavDisplay(false);
    }



    return (
        <div className='container-header'>
            <div className='left-header'>
                <h2 id="header-logo" >Study Web App</h2>
                <div className="left-links">
                    <Link href="/" underline={true}>Dashboard</Link>
                    <Link href="/" underline={true}>Flashcards</Link>
                    <Link href="/" underline={true}>Create</Link>
                </div>
            </div>
            <div className='right-header'>
                <TextField id="search-box" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search Sets" />
                <Link href="/" id="profile-icon"><UserAvatar size={25}/></Link>
                <Link href="/" id="settings-icon"><Settings size={25}/></Link>
            </div>
            <div className='hamburger-menu'>
                <Link href="#" id="hamburger-icon" onClick={openMenu}><Menu size={25}/></Link>
            </div>
        
            {/* For Mobile */}
            <div id="mobile-hrefs" style={{ 'display': `${mobileNavDisplay == true ? 'block' : 'none' }`}}>
                <div className="close-button-container">
                    <button id="close-menu-button" onClick={closeMenu}><h1>✕</h1></button>
                </div>
                <div className="content-container">
                    <Link href="/"><h1>Study Web App</h1></Link>
                    <Link href="/"><LTxt>Home</LTxt></Link>
                    <Link href="/"><LTxt>Dashboard</LTxt></Link>
                    <Link href="/"><LTxt>Flashcards</LTxt></Link>
                    <Link href="/"><LTxt>Create</LTxt></Link>
                    <Link href="/"><LTxt>Profile</LTxt></Link>
                    <Link href="/"><LTxt>Settings</LTxt></Link>
                    <TextField id="search-box-mobile" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="" />
                </div>
            </div>

        </div>

        
    );
}

export default Header;