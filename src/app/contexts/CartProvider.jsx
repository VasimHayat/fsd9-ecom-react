 import React, { createContext, useContext, useEffect, useState } from 'react'; 
import CartService from '../services/CartService'; 
 

const CartContext = createContext();
 
export const CartProvider = ({ children }) => {
 
  const [cartDetail, setCartDetail] = useState(null);
 const [numOfCartItem, setNumOfCartItem] = useState(null); 

 useEffect(() => { 
  const cartDetail = CartService.getCartDetail();
  if (cartDetail) {
    setCartDetail(cartDetail)
    setNumOfCartItem(cartDetail.eoCartItemArray.length);
  };
}, []);

  const addItemToCart = (payload) => {
      CartService.addCartItem(payload,setCartDetail);
  };

  

  const removeItemFromCart = (item) => {
   
  };

  const getCartItems = () => {
    return []
  };

  return (
    <CartContext.Provider
    value={{
      addItemToCart,
      removeItemFromCart,
      getCartItems,
      cartDetail, setCartDetail,
      numOfCartItem, setNumOfCartItem
    }}
  >
    {children}
  </CartContext.Provider>
  );
};
 
export const useCart = () => {
  return useContext(CartContext);
};
