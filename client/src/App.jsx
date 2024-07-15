import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Container from './components/container/container';
import Footer from './components/footer/footer.jsx';
import './App.css';

// Pages
import LandingPage from './screens/landing/landing-page.jsx';
import CreateAccount from './screens/create-account/create-account';
import LoginPage from './screens/login/login-page.jsx';

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
            
          }>
        </Route>
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
          }/>
          
      </Routes>
      
  );
}

export default App;