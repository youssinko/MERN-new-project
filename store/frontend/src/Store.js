//////////========= store data to local storage in this file ===========//////////

import { createContext, useReducer } from "react";
export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo") ?
   JSON.parse(localStorage.getItem("userInfo"))
      : null,

  cart: {
    personalizedMsg: localStorage.getItem("personalizedMsg")
      ? JSON.parse(localStorage.getItem("personalizedMsg"))
      : '',
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      paymentMethod: localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : '',
    //if cartItem exist in local storage , use JSON.parse to convert string to javascript object otherwise set it as empty array
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // add to cart
      const newItem = action.payload;
      //use find function to look if item is existing in the shopping cart
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      //use if statement to check IF existing item is true, use map function to update existing item with the new item that came from action.payload, otherwise keep the item. if item doesn't exist in shopping cart, added to the list.
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      //store at localstorage so in case if we refresh page, items in cart still exist
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
      //keep  the state and keep all items in the cart then add new item in action.payload
    }
    case "CART_CLEAR":
      return{...state, cart:{
        ...state.cart ,cartItems:[]}
        
      }
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    //keep previous state and update userinfo based on info we received from backend
    case "USER_SIGNOUT":
      return{...state, userInfo: null,
              cart: {
                cartItems: [],
                shippingAddress:{},
                paymentMethod:'',
                personalizedMsg:''
              }}
      case "SAVE_SHIPPING_ADDRESS":
      return{...state, cart:{
        ...state.cart , 
        shippingAddress: action.payload,
      },
    }
    case "SAVE_PAYMENT_METHOD":
      return{...state, cart:{
        ...state.cart , 
        paymentMethod: action.payload,
      },
    }
    case "SAVE_PERSONALIZED_MSG":
      
      return{...state, cart:{
        ...state.cart , 
        personalizedMsg: action.payload,
      },
    }

      default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
