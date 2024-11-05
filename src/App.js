import React, { useEffect, useState } from "react";

const App = () => {
  const [value, setValue] = useState(0);
  const [number, setNumber] = useState(false);
  const [uppercase, setUpperCase] = useState(false);
  const [lowercase, setLowerCase] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [passChar, setPassChar] = useState("weak");
  const [finalValue, setFinalValue] = useState("");

  useEffect(() => {
    const char = finalValue?.length;
    if (char > 0 && char < 5) {
      setPassChar("Weak");
    } else if (char >= 6 && char < 14) {
      setPassChar("Good");
    } else if (char > 14) {
      setPassChar("Very strong");
    }
  }, [finalValue]);

  const generatePassword = () => {
    const characters = [];
    if (uppercase) characters.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (lowercase) characters.push("abcdefghijklmnopqrstuvwxyz");
    if (number) characters.push("0123456789");
    if (symbol) characters.push("!@#$%^&*()_+");

    let password = "";
    for (let i = 0; i < value; i++) {
      const randomCharSet =
        characters[Math.floor(Math.random() * characters.length)];
      const randomChar =
        randomCharSet[Math.floor(Math.random() * randomCharSet.length)];
      password += randomChar;
    }
    setFinalValue(password);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <h1>Password Generator</h1>
      <div
        style={{
          background: "#34495e",
          width: 500,
          padding: 10,
          height: 300,
        }}
      >
        <p style={{ color: "white" }}>Password here: {finalValue}</p>

        <div>
          <p style={{ color: "white" }}>Character length : {value}</p>
          <input
            style={{ width: 500 }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="range"
            min="0"
            max="20"
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUpperCase(e.target.checked)}
            />
            <label style={{ color: "white" }}>Include Uppercase letter</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowerCase(e.target.checked)}
            />
            <label style={{ color: "white" }}>Include Lowercase letter</label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 160,
          }}
        >
          <div>
            <input
              type="checkbox"
              checked={number}
              onChange={(e) => setNumber(e.target.checked)}
            />
            <label style={{ color: "white" }}>Include numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={symbol}
              onChange={(e) => setSymbol(e.target.checked)}
            />
            <label style={{ color: "white" }}>Include symbol</label>
          </div>
        </div>
        <p style={{ color: "white" }}>Strength : {passChar}</p>
        <button
          style={{
            padding: 10,
            background: "#2ecc71",
            margin: "30px 0px 0px 170px",
          }}
          onClick={generatePassword}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default App;
