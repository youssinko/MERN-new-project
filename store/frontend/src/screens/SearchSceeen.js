import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utilities";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import  Button  from "react-bootstrap/Button";
import Product from "../components/Product";
import { LinkContainer } from "react-router-bootstrap";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];
export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },
  {
    name: "3stars & up",
    rating: 3,
  },
  {
    name: "2stars & up",
    rating: 2,
  },
  {
    name: "1stars & up",
    rating: 1,
  },
];

function SearchSceeen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParam = new URLSearchParams(search); // /search?category=stickers
  const category = searchParam.get("category") || "all";
  const query = searchParam.get("query") || "all";
  const price = searchParam.get("price") || "all";
  const rating = searchParam.get("rating") || "all";
  const order = searchParam.get("order") || "newest";
  const page = searchParam.get("page") || 1;
  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, [dispatch]);
  const getfilterUrl = (filter) => {
    //if we change the page, it does exist use it otherwise use page defined in reducer
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const sortOrder = filter.order || order;
    const filterQuery = filter.query || query;
    const filterPrice = filter.price || price;
    const filterRating = filter.rating || rating;
    return `/search?page=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}`;
  };
  return (
    <div>
      <Helmet>
        <title>Search products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3>Department</h3>
          <div>
            <ul>
              <li>
              <Link
                  className={'all' === category ? 'text-bold' : ''}
                  to={getfilterUrl({ category: 'all' })}
                >
                  Any
                </Link>
              </li>
              {categories.map((currentCategory) => (
                <li key={currentCategory}>
                  <Link
                    className={currentCategory === category ? "text-bold" : ""}
                    to={getfilterUrl({ category: currentCategory })}
                  >
                    {currentCategory}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold" : ""}
                  to={getfilterUrl({ price: "all" })}
                >
                  Any
                </Link>
              </li>
              {prices.map((currentPrice) => (
                <li key={currentPrice.value}>
                  <Link
                    className={currentPrice.value === price ? "text-bold" : ""}
                    to={getfilterUrl({ price: currentPrice.value })}
                  >
                    {currentPrice.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((currentRating) => (
                <li key={currentRating.name}>
                  <Link
                    to={getfilterUrl({ rating: currentRating.rating })}
                    className={
                      `${currentRating.rating}` === `${rating}`
                        ? "text-bold"
                        : ""
                    }
                  >
                    <Rating
                      caption={" &up"}
                      rating={currentRating.rating}
                    ></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={getfilterUrl({ rating: "all" })}
                  className={rating === "all" ? "text-bold" : ""}
                >
                  <Rating caption={" & up"} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox varient="danger"></MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col>
                <div>
                    {countProducts === 0? 'No' : countProducts} Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' :Price ' + price}
                    {rating !== 'all' && ' : Rating ' + rating + '& up'}
                    {query !== 'all' || 
                    category !== 'all'||
                     price !== 'all'|| 
                     rating !== 'all' ?(
                        <Button
                        varient="light"
                        onClick={()=>{
                            navigate('/search')
                        }}
                        >
                            <i className="fas fa-times-circle"></i>
                        </Button>
                    ): null}
                </div>
                </Col>
                <Col className="text-end">
                    Sort by{' '}
                    <select value={order}
                    onChange={(e)=>{
                        navigate(getfilterUrl({order: e.target.value}))
                    }}>
                        <option value='newest'>Newest Arrivals</option>
                        <option value='lowest'>Price:Low to High</option>
                        <option value='highest'>Price:High to Low</option>
                        <option value='toprated'>Avg.Customer Reviews</option>
                    </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
             <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
              <div>
                {[...Array(pages).keys()].map((x)=>{
                    <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getfilterUrl({page: x + 1})}
                    >
                    <Button className={Number(page) === x + 1 ? 'text-bold' : ''} variant='light'>
                        {x + 1}
                    </Button>
                    </LinkContainer>
                })}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default SearchSceeen;
