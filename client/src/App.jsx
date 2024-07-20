import { Route, Routes } from 'react-router-dom';
import Container from './components/container/container';
import Footer from './components/footer/footer.jsx';
import './App.css';

//headers
// import SessionHeader from './components/header/non-session-header/header.jsx';
import NoSessionHeader from './components/header/non-session-header/non-session-header.jsx';

// Pages
import LandingPage from './screens/landing/landing-page.jsx';
import CreateAccount from './screens/create-account/create-account';
import LoginPage from './screens/login/login-page.jsx';
import NotFoundPage from './screens/404/not-found-page.jsx';

const App = () => {

  return (
      
      <Routes>
        <Route 
          path="/"
          element={
            <>
              <NoSessionHeader />
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
              <CreateAccount />
            </>
          }>
        </Route>
        <Route 
          path="/login" 
          element={
            <>
              <NoSessionHeader />
              <Container>
                <div className='content'>
                  <LoginPage />
                </div>
                <Footer />
              </Container>
            </>
          }>
        </Route>

        {/* Catch All Page - 404 */}
        <Route
          path="*"
          element={
            <>
              <NoSessionHeader />
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