import React from 'react'
import { Link } from 'react-router-dom'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Rating from './Rating'
import { useContext } from 'react'
import { Store } from '../Store'
import axios from 'axios'
function Product(props) {
  const {product} = props

  const {state, dispatch:contextDispatch} =useContext(Store)
  const {
    cart: { cartItems },
  } = state;
  
// //we can have an access of state of context and change it --globally
//    const addToCartHandler=(item)=>{
// //function that add item to the cart, dispatch an action in the react context
// contextDispatch({type:'CART_ADD_ITEM',payload:{...product,quantity:1}})
//    }
const addToCartHandler = async (item) => {
  const existItem = cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  const { data } = await axios.get(`/api/products/${item._id}`);
  if (data.stock < quantity) {
    window.alert('Sorry. Product is out of stock');
    return;
  }
//function that add item to the cart, dispatch an action in the react contect
contextDispatch({type:'CART_ADD_ITEM',payload:{...item,quantity}})
 }

    
  return (
    <Card>
    <Link to={`/product/${product.slug}`}>
      <img src={product.image} className="card-img-top" alt={product.name} />
    </Link>
    <Card.Body>
      <Link to={`/product/${product.slug}`}>
        <Card.Title>{product.name}</Card.Title>
      </Link>
      <Rating rating={product.rating} numReviews={product.numReviews} />
      
        <Card.Text>${product.price}</Card.Text>
        {product.stock === 0 ? <Button style={{backgroundColor:'grey'}} disabled>Out of Stock</Button>
        :
      <Button onClick={() => addToCartHandler(product)}> Add to Cart</Button>
  }
      </Card.Body>
</Card>
)
}

export default Product