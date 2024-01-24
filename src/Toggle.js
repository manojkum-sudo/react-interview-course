import React, { useState } from "react";

const Toggle = () => {
  const [value, setValue] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(!value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input type="checkbox" onChange={handleChange} />
      <div
        style={{
          width: 200,
          height: 200,
          border: "1px solid red",
          background: value ? "red " : "none",
        }}
      >
        ""
      </div>
    </div>
  );
};

export default Toggle;
