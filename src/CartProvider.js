import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartProduct, setCartProduct] = useState([]);

  const handleCart = (item) => {
    setCartProduct((prevVal) => [...prevVal, item]);
  };

  return (
    <CartContext.Provider value={{ cartProduct, handleCart, setCartProduct }}>
      {children}
    </CartContext.Provider>
  );
};
