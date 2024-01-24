import React from "react";
import { useCart } from "./CartProvider";

const Cart = () => {
  const { cartProduct, setCartProduct } = useCart();

  const handleAdd = (id) => {
    let updatedCart = cartProduct.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: (item.quantity || 0) + 1 };
      }
      return item;
    });
    setCartProduct(updatedCart);
  };

  const handleMinus = (id) => {
    let updatedCart = cartProduct.map((item) => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updatedCart = updatedCart.filter((item) => item.quantity !== 0);
    setCartProduct(updatedCart);
  };

  return (
    <div>
      Cart
      <div style={{ marginLeft: 10 }}>
        {cartProduct?.map((item) => (
          <div key={item?.id} style={{ marginLeft: 50 }}>
            <img src={item?.image} alt="product image" style={{ width: 200 }} />
            <p>{item?.title}</p>
            <button onClick={() => handleMinus(item.id)}>-</button>
            <p>{item?.quantity || 0}</p>
            <button onClick={() => handleAdd(item.id)}>+</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
