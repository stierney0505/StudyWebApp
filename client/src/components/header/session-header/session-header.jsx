import styles from './session-header.module.css';
import { useState } from "react";
import Link from '../../links/link';
import { Settings, UserAvatar, Menu, LightFilled, AsleepFilled } from "@carbon/icons-react";
import HeaderSearchBar from '../../header-search-bar/header-search-bar';
import { LTxt } from '../../text/text';
import Logo from './../../../../assets/logo.svg';
import LogoDark from './../../../../assets/logo-dark.svg';

const SessionHeader = ({ darkMode, toggleDarkMode }) => {

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
    <div className={styles['container-header']}>
      <div className={styles['left-header']}>
        {!darkMode ? (
          <img
            src={Logo}
            alt="Study Web App Logo"
            width={130}
          />
        ) : (
          <img
            src={LogoDark}
            alt="Study Web App Logo"
            width={130}
          />
        )}
        <div className={styles['left-links']}>
          <Link href="/" underline={true}>Dashboard</Link>
          <Link href="/" underline={true}>Flashcards</Link>
          <Link href="/" underline={true}>Create</Link>
        </div>
      </div>
      <div className={styles['right-header']}>
        <div className={styles['search-box']}>
          <HeaderSearchBar
            name="searchBox"
            placeholder="Search Sets"
            title="Search for Study Sets"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <button
          type="button"
          className={styles['icon-button']}
          // onClick={}
        >
          <UserAvatar size={24} />
        </button>
        <button
          type="button"
          className={`${styles['icon-button']} ${styles['settings-icon']}`}
        >
          <Settings size={24} />
        </button>
        <button
          type="button"
          className={styles['icon-button']}
          onClick={toggleDarkMode}
        >
          {!darkMode ? <AsleepFilled size={24} /> : <LightFilled size={24} />}
        </button>
      </div>
      <button
        type="button"
        className={`${styles['icon-button']} ${styles['hamburger-menu']}`}
        onClick={openMenu}
      >
        <Menu size={24} />
      </button>

      {/* For Mobile */}
      <div
        id="mobile-hrefs"
        className={styles['mobile-hrefs']}
        style={{ 'display': `${mobileNavDisplay == true ? 'block' : 'none'}` }}
      >
        <div className={styles['close-button-container']}>
          <button onClick={closeMenu}>
            <h1>✕</h1>
          </button>
        </div>
        <div className={styles['content-container']}>
          <Link href="/"><h1>Study Web App</h1></Link>
          <Link href="/"><LTxt>Home</LTxt></Link>
          <Link href="/"><LTxt>Dashboard</LTxt></Link>
          <Link href="/"><LTxt>Flashcards</LTxt></Link>
          <Link href="/"><LTxt>Create</LTxt></Link>
          <Link href="/"><LTxt>Profile</LTxt></Link>
          <Link href="/"><LTxt>Settings</LTxt></Link>

          <div className={styles['search-box-mobile']}>
            <HeaderSearchBar
              name="searchBoxMobile"
              placeholder="Search Sets"
              title="Search for Study Sets"
              growOnFocus={false}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionHeader;
