import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { Store } from "../Store";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { getError } from "../utilities";
import Product from "../components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload,
   
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ProductListScreen() {
  const [
    {
      loading,
      error,
      products,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;
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
     
      if (successDelete) {
        dispatch({ type: "DELETE_RESET" });
      } 
    }
        fetchData();
    
    }, [ userInfo, successDelete]);



  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("product deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h1 style={{display:"flex", justifyContent:'center'}}>Products</h1>
        </Col>

        <div className="products">
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product._id}>
                 
                  <Product product={product}/>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </Button>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Row>
    </div>
  );
}
