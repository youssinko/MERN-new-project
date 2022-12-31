import React, { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";

import ControlledCarousel from "../components/Carousel";


//manage complex state by using useReducer instead of useState (useState always depend on previous state)
const reducer = (state, action) => {
  //state is current state, action that change  the state and create new state
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    //depend when we start request to the backend, return new state , keep state value but change payload to true
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    //keep values of previous state and only update product w. data coming from the backend data (action.payload has all products from backend)
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  //2 paramaters , (objects of loading,error and products) AND  dispatch to call an action
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    //set default value
    products: [],
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
        const result = await axios.get("/api/products");
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
  }, []);
  return (
    <div>
      <Helmet>
        <title>
          Home
        </title>
      </Helmet>
      <h1>personalized products</h1>
      <ControlledCarousel />
      <div className="products">
        {loading ? (
          <Loading />
        ) : error ? (
         <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Row>
         { products.map((product) => (
            <Col  key={product.slug} sm={6} md={4} lg={4} className="mb-3">
            <Product product={product}></Product>
            </Col>
          ))
         }
          </Row>
        )}
       
      </div>
    </div>
  );
}

export default HomeScreen;
