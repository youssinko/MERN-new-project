import "./App.css";
import{ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import logo from "./logo.jpeg";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/esm/Badge";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingScreen from "./screens/ShippingScreen";

function App() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart,userInfo } = state;
  const signoutHandler =()=>{
    contextDispatch({type: 'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
  }
  return (
    <div className="d-flex flex-column site-container">
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar style={{ backgroundColor: "rgb(33,33,33)" }}>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img src={logo} alt="Home" style={{ width: "190px" }} />
              </Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a,c)=> a + c.quantity , 0)}
                   
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='basic-nav-dropdown'> 
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>User profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/orderhistory'>
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                <NavDropdown.Divider />
                  <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>Sign out</Link>
                
                </NavDropdown>
                
              ):(
                <Link className='nav-link' to='/signin'>Sign In</Link>
              )}
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />}></Route>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/shipping" element={<ShippingScreen />}></Route>
            

          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
