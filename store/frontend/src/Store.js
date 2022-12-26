import { createContext, useReducer } from "react";
export const Store = createContext();
const initialState = {
  cart: {
    cartItems: [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    
    case 'CART_ADD_ITEM':
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
      
      return { ...state, cart: { ...state.cart, cartItems } };

    //keep  the state and keep all items in the cart then add new item in action.payload
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
