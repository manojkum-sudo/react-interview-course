// Home.jsx

import React from "react";
import Product from "./Product";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <Product />
    </div>
  );
};

export default Home;
