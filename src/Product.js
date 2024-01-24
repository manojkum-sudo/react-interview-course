import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import { useCart } from "./CartProvider";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { handleCart } = useCart();
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          justifyContent: "center",
        }}
      >
        {products.map((item) => (
          <>
            <div key={item.id}>
              <img
                src={item.image}
                alt="product image"
                style={{ width: 200 }}
              />
              <p>{item.category}</p>
              <button onClick={() => handleCart(item)}>Add to Cart</button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Product;
