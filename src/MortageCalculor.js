import React, { useState } from "react";

const App = () => {
  const [loanInput, setLoanInput] = useState(0);
  const [interestInput, setInterestInput] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [result, setResult] = useState(0);

  const loanInp = parseFloat(loanInput);
  const interestInp = parseFloat(interestInput);
  const loanTermInp = parseFloat(loanTerm) * 12;

  const monthly =
    (loanInp * (interestInp * (1 + interestInp) * loanTermInp)) /
    ((1 + interestInp) * loanTermInp - 1);

  //M = P(i(1+i)n)/((1+i)n - 1)

  const handleSubmit = () => {
    setResult(monthly);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      Mortgage Calculator
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <input
          type="number"
          placeholder="enter loan"
          onChange={(e) => setLoanInput(e.target.value)}
        />
        <input
          type="number"
          placeholder="enter annnual interest"
          onChange={(e) => setInterestInput(e.target.value)}
        />
        <input
          type="number"
          placeholder="enter loan term"
          onChange={(e) => setLoanTerm(e.target.value)}
        />
        <button onClick={handleSubmit}>Calculate</button>

        <div>
          <p> Loan amount :- {result.toFixed(2)} </p>
          <p>Annual interest rate :- {interestInp.toFixed(2)} </p>
          <p>Loan term :- {loanTermInp} </p>
        </div>
      </div>
    </div>
  );
};

export default App;
