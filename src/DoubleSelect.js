import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const countries = [
  { name: "India", value: "IN", cities: ["Delhi", "Mumbai"] },
  { name: "Pak", value: "IN", cities: ["Lahore", "Karachi"] },
  { name: "USA", value: "IN", cities: ["Florida", "California"] },
];

const App = () => {
  const [value, setValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <select onChange={(e) => setValue(e.target.value)}>
        {countries.map((item, index) => {
          return (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>
      <div>
        <select
          onChange={(e) => {
            setSelectedCity(e.target.value);
          }}
        >
          {countries
            .find((item) => item.name === value)
            ?.cities.map((item) => {
              return <option value={item}>{item}</option>;
            })}
        </select>
      </div>
    </div>
  );
};

export default App;
