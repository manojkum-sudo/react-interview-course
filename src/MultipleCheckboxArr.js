import React, { useEffect, useState } from "react";

const arr = ["play football", "club house", "basketball"];

const App = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [todos, setTodos] = useState(
    arr.map((item, index) => ({ id: index, name: item, checked: false }))
  );

  const handleChange = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === index ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    setSelectedIds([]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        flexDirection: "column",
      }}
    >
      {todos.map((todo) => (
        <div key={todo.id} style={{ display: "flex" }}>
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => handleChange(todo.id)}
          />
          <p style={{ textDecoration: todo.checked ? "line-through" : "none" }}>
            {todo.name}
          </p>
          {todo.checked && (
            <button onClick={() => handleDelete(todo.id)}>X</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
