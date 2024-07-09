import './header.css';
import React, { useState } from "react";
import Link from '../links/link';
import { Settings, UserAvatar, } from "@carbon/icons-react";
import TextField from '../text-field/text-field';

const Header = () => {

    const [searchValue, setSearchValue] = useState('');

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
                <TextField id="search-box" type="text" value={searchValue} onChange={setSearchValue} placeholder="Search Sets" />
                <Link href="/" id="profile-icon"><UserAvatar size={25}/></Link>
                <Link href="/" id="settings-icon"><Settings size={25}/></Link>
            </div>
        </div>
    );
}

export default Header;