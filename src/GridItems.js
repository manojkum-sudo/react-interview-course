import React, { useEffect, useState } from "react";

const myObj = [
  {
    id: 1,
    isCheck: false,
  },
  {
    id: 2,
    isCheck: false,
  },
  {
    id: 3,
    isCheck: false,
  },
];

const App = () => {
  const [gridItems, setGridItem] = useState(myObj);
  const [sequence, setSequence] = useState([]);
  const [toggleIsCheck, setToggleIsCheck] = useState(0);

  const handleClick = (clickedObj) => {
    setToggleIsCheck(clickedObj.id);
    setSequence((preVal) => [...preVal, clickedObj]);
    setGridItem((preObj) =>
      preObj.map((item) =>
        item.id === clickedObj.id
          ? { id: item.id, isCheck: !item.isCheck }
          : item
      )
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setGridItem((preObj) =>
        preObj.map((item) =>
          item.id === toggleIsCheck
            ? { id: item.id, isCheck: !item.isCheck }
            : item
        )
      );
    }, 2000);
  }, [sequence]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        gap: 10,
      }}
    >
      {gridItems.map((item) => {
        return (
          <button
            style={{
              border: "1px solid #777",
              width: 50,
              height: 50,
              background: item.isCheck ? "green" : "yellow",
            }}
            key={item.id}
            onClick={() => handleClick(item)}
          >
            {item.id}
          </button>
        );
      })}
    </div>
  );
};

export default App;
