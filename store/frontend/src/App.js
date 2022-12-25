

import './App.css';

import {Link, Route, Router, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import logo from './logo.jpeg'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {LinkContainer} from 'react-router-bootstrap'
function App() {
  return (
    <div className='d-flex flex-column site-container'>
       <header>
        <Navbar style={{backgroundColor:'rgb(33,33,33)'}}>
          <Container>
            <LinkContainer to="/">
            <Navbar.Brand><img src={logo} alt='Home' style={{width:'190px'}} /></Navbar.Brand>
           
            </LinkContainer>
          </Container>
        </Navbar>
    
        </header>
     <main>
      <Container>
      <Routes>
        <Route path='/product/:slug' element={<ProductScreen />}></Route>
        <Route path ="/" element={<HomeScreen />}></Route>
      </Routes>
      </Container>
     </main>
    <footer>
      <div className='text-center'>All rights reserved</div>
    </footer>
    </div>
  );
}

export default App;
