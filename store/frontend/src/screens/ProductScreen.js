import React from "react";
import { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Rating from "../components/Rating";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Helmet } from "react-helmet-async";
const reducer = (state, action) => {
  //state is current state, action that change  the state and create new state
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    //depend when we start request to the backend, return new state , keep state value but change payload to true
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    //keep values of previous state and only update product w. data coming from the backend data (action.payload has all products from backend)
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    //set default value
    product: [],
    loading: true,
    error: "",
  });

  //getting / fetching products from backend using useReducer instead of useState
  // const [products , setProducts]= useState([])

  useEffect(() => {
    const fetchData = async () => {
      //first we send fetch request
      dispatch({ type: "FETCH_REQUEST" });
      //fetch the data and put it inside a variable (result)
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        //if fetching was successful then use fetch_sucess
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        //if fetching Failed then use fetch_fail
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      // setProducts(result.data)
    };
    //call function
    fetchData();
  }, [slug]); //when user switch pages/slug =>refetching
  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.name} className="img-large" />
        </Col>
        <Col md={3}>
          <ListGroup style={{margin:"1rem"}}>
            <ListGroup.Item>
              <Helmet>
              <title> {product.name} </title>
              </Helmet>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price : {product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card style={{margin:"1rem"}}>
            <Card.Body>
              <ListGroup varient="flush">
                <ListGroup.Item >
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.stock>0?
                    <Badge bg="success">In Stock</Badge>
                    :
                    <Badge bg='danger'>Unavailable</Badge>
                    }</Col>
                  </Row>
                </ListGroup.Item>
                {product.stock>0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button varient="primary">Add to cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
