import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Container from './components/container/container';
import Footer from './components/footer/footer.jsx';
import './App.css';

// Pages
import LandingPage from './screens/landing/landing-page.jsx';
import CreateAccount from './screens/create-account/create-account.jsx';
import LoginPage from './screens/login/login-page.jsx';
import RequestPasswordReset from './screens/reset-password/request-password-reset/request-password-reset.jsx';
import PasswordResetRequestSent from './screens/reset-password/password-reset-request-sent/password-reset-request-sent.jsx';
import ChangePassword from './screens/reset-password/change-password/change-password.jsx';
import PasswordSuccessfullyChanged from './screens/reset-password/password-successfully-changed/password-successfully-changed.jsx';

const App = () => {

  return (

    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Container>
              <div className='content'>
                <LandingPage />
              </div>
              <Footer /><br />
            </Container>
          </>
        }
      />
      <Route
        path="/create-account"
        element={
          <>
            <CreateAccount />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Header />
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
    </Routes>

  );
}

export default App;