import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../components/MessageBox";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup'

function CartScreen() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <Row>
        <Col md={8}>
          {cartItems.lenght === 0 ? (
            <MessageBox>
              Cart is Empty <Link to="/">Back to Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button varient="light" disable={item.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span>{item.quantity}</span>{' '}
                      <Button  variant="light" disable ={item.quantity ===1}>
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col md={2}>
                        <Button varient='light'>
                            <i className="fas fa-trash"></i>
                        </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
