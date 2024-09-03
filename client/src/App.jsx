import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from './components/container/container';
import Footer from './components/footer/footer.jsx';
import './index.css';
import './App.css';

//headers
import SessionHeader from './components/header/session-header/session-header.jsx';
import NonSessionHeader from './components/header/non-session-header/non-session-header.jsx';

// Pages
import LandingPage from './screens/landing/landing-page.jsx';
import CreateAccount from './screens/create-account/create-account.jsx';
import LoginPage from './screens/login/login-page.jsx';

import NotFoundPage from './screens/404/not-found-page.jsx';
import { useEffect } from 'react';

import RequestPasswordReset from './screens/reset-password/request-password-reset/request-password-reset.jsx';
import PasswordResetRequestSent from './screens/reset-password/password-reset-request-sent/password-reset-request-sent.jsx';
import ChangePassword from './screens/reset-password/change-password/change-password.jsx';
import PasswordSuccessfullyChanged from './screens/reset-password/password-successfully-changed/password-successfully-changed.jsx';
import ModifyAccount from './screens/modify-account/modify-account.jsx';


const App = () => {

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true'; // Convert string to boolean
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'true' : 'false');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  return (


    <Routes>
      <Route
        path="/"
        element={
          <>
            <NonSessionHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Container>
              <div className='content'>
                <LandingPage />
              </div>
              <Footer /><br />
            </Container>
          </>
        }>
      </Route>
      <Route
        path="/create-account"
        element={
          <>
            <NonSessionHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Container>
              <div className='content'>
                <CreateAccount />
              </div>
                <Footer />
            </Container>
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <NonSessionHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Container>
              <div className='content'>
                <LoginPage />
              </div>
              <Footer />
            </Container>
          </>
        }
      />
      <Route
        path="/request-password-reset"
        element={
          <>
            <RequestPasswordReset />
          </>
        }
      />
      <Route
        path="/password-reset-request-sent"
        element={
          <>
            <PasswordResetRequestSent />
          </>
        }
      />
      <Route
        path="/change-password/:id"
        element={
          <>
            <ChangePassword />
          </>
        }
      />
      <Route
        path="/password-successfully-changed"
        element={
          <>
            <PasswordSuccessfullyChanged />
          </>
        }
      />
      <Route
        path="/modify-account/"
        element={
          <>
            <SessionHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Container>
              <div className='content'>
                <ModifyAccount />
              </div>
              <Footer />
            </Container>
          </>
        }
      />
      {/* Catch All Page - 404 */}
      <Route
        path="*"
        element={
          <>
            <NonSessionHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Container>
              <div className='content'>
                <NotFoundPage />
              </div>
              <Footer />
            </Container>
          </>
        }>
      </Route>
    </Routes>
  );
}

export default App;
