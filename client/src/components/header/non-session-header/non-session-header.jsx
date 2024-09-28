import styles from './non-session-header.module.css';
import { useState } from "react";
import Link from '../../links/link';
import { Menu, LightFilled, AsleepFilled } from "@carbon/icons-react";
import HeaderSearchBar from '../../header-search-bar/header-search-bar';
import InputButton from '../../button/button';
import Logo from './../../../../assets/logo.svg';
import LogoDark from './../../../../assets/logo-dark.svg';
import { useNavigate } from 'react-router-dom';

const NonSessionHeader = ({ darkMode, toggleDarkMode }) => {

  const navigate = useNavigate();

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
        <div className={styles['header-button']}>
          <Link href="/login" underline={true}>Log In</Link>
        </div>
        <div className={styles['header-button']}>
          <InputButton
            text="Get Started"
            size="small"
            onClick={() => navigate("/create-account")}
          />
        </div>
        <button
          type="button"
          className={styles['toggle-dark-mode']}
          onClick={toggleDarkMode}
        >
          {!darkMode ? <AsleepFilled size={24} /> : <LightFilled size={24} />}
        </button>
      </div>
      <div className={styles['hamburger-menu']}>
        <button
          type="button"
          className={styles['hamburger-icon']}
          onClick={openMenu}
        >
          <Menu size={24} />
        </button>
      </div>

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
          <div className={styles['action-buttons-responsive']}>
            <Link href="/login" underline={true}>
              Log In
            </Link>
            <InputButton
              text="Get Started"
              size="small"
              onClick={() => navigate("/create-account")}
            />
          </div>
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

export default NonSessionHeader;
