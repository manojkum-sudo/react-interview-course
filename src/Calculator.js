import React, { useEffect, useState } from "react";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(0);

  const calculate = (operator) => {
    const operands = expression.split(/\+|\-|\*|\//);
    const num1 = parseFloat(operands[0]);
    const num2 = parseFloat(operands[1]);

    switch (operator) {
      case "add":
        setResult(num1 + num2);
        break;
      case "minus":
        setResult(num1 - num2);
        break;
      case "multiply":
        setResult(num1 * num2);
        break;
      case "divide":
        setResult(num1 / num2);
        break;
      default:
        setResult(0);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <input
        type="text"
        placeholder="Enter the expression"
        onChange={(e) => setExpression(e.target.value)}
      />

      <button onClick={() => calculate("add")}>Add</button>
      <button onClick={() => calculate("minus")}>Subtract</button>
      <button onClick={() => calculate("multiply")}>Multiply</button>
      <button onClick={() => calculate("divide")}>Divide</button>
      <div>Result: {result}</div>
    </div>
  );
};

export default Calculator;
