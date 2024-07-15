import { Route, Routes } from 'react-router-dom';
import LandingPage from './screens/landing/landing-page.jsx';
import CreateAccount from './screens/create-account/create-account';
import Header from './components/header/header';
import Container from './components/container/container';
import Footer from './components/footer/footer.jsx';
import './App.css';

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
            <Route path="create-account" element={CreateAccount}/>
        </Route>
          
      </Routes>
      
  );
}

export default App;