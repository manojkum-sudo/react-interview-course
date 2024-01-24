import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartProvider";

const Navbar = () => {
  const { cartProduct, setCartProduct } = useCart();
  console.log("🚀 ~ Navbar ~ cartProduct:", cartProduct);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/product">Product</Link>
      <Link to="/cart">
        Cart (<strong>{cartProduct.length || 0} </strong>)
      </Link>
    </div>
  );
};

export default Navbar;
