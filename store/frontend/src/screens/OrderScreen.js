import React, { useContext, useEffect } from "react";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";
import { getError } from "../utilities";
import { Helmet } from "react-helmet-async";
import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/esm/ListGroup";
function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, order: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
  default:
    return state;
}
}

function OrderScreen() {
    const { state } = useContext(Store);
    const { userInfo } = state;
  
    const params = useParams();
    const { id: orderId } = params;
    const navigate = useNavigate();
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (
        //if order id is null or doesnt equal to current order id then fetch order
    !order._id ||
     (order._id && order._id !== orderId)
    ) {
        fetchOrder()
    }
  
}, [order,userInfo,orderId,navigate]);
  return loading ? (
    <Loading />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
        <Helmet>
            <title>Order{orderId}</title>
        </Helmet>
        <h1 className="my-3">Order {orderId}</h1>
        <Row>
            <Col md={8}>
                <Card>
                    <Card.Body>
                        <Card.Title>Shipping</Card.Title>
                        <Card.Text>
                            <strong>Name:</strong>{order.shippingAddress.fullName}<br />
                            <strong>Address:</strong>{order.shippingAddress.address},
                            {order.shippingAddress.city},{order.shippingAddress.homeState},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                        </Card.Text>
                        {order.isDelivered?(
                            <MessageBox variant='success'>Delivered at {order.deliverAt}</MessageBox>
                        ):
                        (
                            <MessageBox variant='danger'>Not Delivered</MessageBox>
                        )
                        }
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Payment</Card.Title>
                        <Card.Text>
                            <strong>Method:</strong>{order.paymentMethod}<br />

                        </Card.Text>
                        {order.isPaid?(
                            <MessageBox variant='success'>Paid at {order.paidAt}</MessageBox>
                        ):
                        (
                            <MessageBox variant='danger'>Not Paid</MessageBox>
                        )
                        }
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Items</Card.Title>
                        <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="img-fluid rounded img-thumbnail">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>Quantity:{item.quantity}</span>
                      </Col>
                      <Col md={3}>Price:${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
            <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Order Total</Col>
                    <Col>${order.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              </Card>
            </Col>
        </Row>
    </div>
  );
}

export default OrderScreen;
