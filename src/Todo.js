import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState([]);
  const [updateObj, setUpdateObj] = useState({});
  const [isEdit, setIdEdit] = useState(false);

  const handleSubmit = () => {
    setInputValue((prevVal) => [
      ...prevVal,
      { id: Date.now(), name: value, completed: false },
    ]);
    setValue(" ");
  };
  const handleEdit = () => {
    setInputValue((prevVal) =>
      prevVal.map((item) =>
        item.id === updateObj.id
          ? { ...item, name: value, completed: false }
          : item
      )
    );
    setIdEdit(false);
    setUpdateObj({});
    setValue(" ");
  };

  const handleDone = (item) => {
    setUpdateObj(item);
  };

  const updateRes = () => {
    setInputValue((prevInputValue) => {
      return prevInputValue.map((item) =>
        item.id === updateObj.id ? { ...item, completed: true } : item
      );
    });
  };

  useEffect(() => {
    updateRes();
  }, [updateObj]);

  const handleDelete = (id) => {
    setInputValue(
      inputValue.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const handleUpdate = (item) => {
    setIdEdit(true);
    setValue(item.name);
    setUpdateObj(item);
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter search input..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />

      {isEdit ? (
        <button onClick={handleEdit}>Edit</button>
      ) : (
        <button onClick={handleSubmit}>Submit</button>
      )}

      <div>
        {inputValue?.map((item) => {
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {isEdit || item.completed === false ? (
                <p>{item.name}</p>
              ) : (
                <p
                  style={{
                    textDecoration: "line-through",
                    color: "green",
                  }}
                >
                  {item.name}
                </p>
              )}

              <p style={{ marginLeft: 20 }}>
                {item.completed ? "true" : "false"}
              </p>

              {item.completed === false && (
                <>
                  <button
                    onClick={() => handleDone(item)}
                    style={{
                      width: "100px",
                      height: "20px",
                      marginTop: 20,
                      marginLeft: 20,
                    }}
                  >
                    Done
                  </button>
                </>
              )}
              <button
                style={{
                  width: "100px",
                  height: "20px",
                  marginTop: 20,
                  marginLeft: 20,
                }}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
              <button
                style={{
                  width: "100px",
                  height: "20px",
                  marginTop: 20,
                  marginLeft: 20,
                }}
                onClick={() => handleUpdate(item)}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
