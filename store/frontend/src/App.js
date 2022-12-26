import "./App.css";

import { Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import logo from "./logo.jpeg";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/esm/Badge";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <div className="d-flex flex-column site-container">
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
