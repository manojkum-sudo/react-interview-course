import { FC, useEffect, useState } from "react";

import "./style.css";

const myObj = [
  {
    id: 1,
    imgUrl:
      "https://images.unsplash.com/photo-1682685797366-715d29e33f9d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    imgUrl:
      "https://images.unsplash.com/photo-1682686578707-140b042e8f19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8",
  },
  {
    id: 3,
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1670505061914-5e9f52d0714c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8",
  },
  {
    id: 4,
    imgUrl:
      "https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8",
  },
];

export const App = ({ name }) => {
  const [indexValue, setIndexValue] = useState(1);

  console.log("slide", indexValue);

  const handlePrevious = () => {
    setIndexValue(indexValue - 1);
  };

  const handleNext = () => {
    setIndexValue(indexValue + 1);
  };

  const length = myObj.length;
  console.log(typeof length);

  return (
    <div>
      {myObj.map((item) => {
        if (item.id === indexValue) {
          return (
            <div key={item.id}>
              <img
                style={{ width: "400px", height: "200px" }}
                src={item.imgUrl}
                alt="image"
              />
            </div>
          );
        }
        return null;
      })}
      <button onClick={handlePrevious} disabled={indexValue === 1}>
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={indexValue === length ? true : false}
      >
        Next
      </button>
    </div>
  );
};
