import React, { useRef, useState } from "react";

const options = [
  { label: "first", value: 1 },
  { label: "second", value: 2 },
  { label: "third", value: 3 },
  { label: "fourth", value: 4 },
  { label: "fifth", value: 5 },
];

const App = () => {
  const [value, setValue] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSubmit = (data) => {
    setValue((prevValue) => {
      if (prevValue.some((item) => item.label === data.label)) {
        return prevValue;
      }
      return [...prevValue, data];
    });
  };

  const handleDelete = (index) => {
    setValue((prevValue) => prevValue.filter((_, i) => i !== index));
  };

  const handleDeleteAll = () => {
    setValue([]);
    setIsOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Multi React search</h1>
        <div
          style={{
            border: "1px solid #777",
            width: 300,
            minHeight: 30,
            display: "flex",
            justifyContent: "space-between",
            padding: "3px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            {value.map((item, index) => (
              <>
                <div
                  style={{
                    border: "1px solid #777",
                    background: "yellow",
                    padding: "2px 5px",
                  }}
                  key={index}
                >
                  {item.label}
                  <button
                    onClick={() => handleDelete(index)}
                    style={{ marginLeft: 5 }}
                  >
                    x
                  </button>
                </div>
              </>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div onClick={handleDeleteAll}>x</div>
            <div onClick={() => setIsOpen(!isOpen)}>v</div>
          </div>
        </div>

        {isOpen && (
          <div
            style={{
              border: "1px solid #777",
              width: 320,
              height: 140,
            }}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {options.map((item, index) => (
                <li
                  style={{
                    backgroundColor:
                      currentIndex === index ? "red" : "transparent",
                    padding: "2px 5px",
                    cursor: "pointer",
                  }}
                  onMouseMove={() => setCurrentIndex(index)}
                  key={index}
                  onClick={() => handleSubmit(item)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
