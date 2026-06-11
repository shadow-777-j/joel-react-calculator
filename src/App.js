import { useState } from "react";

// 1. Button Styles Object (keeps our UI looking clean)
const btnStyles = {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "70px",
    width: "70px",
    borderRadius: "35px",
    fontSize: "24px",
    fontWeight: "500",
    cursor: "pointer",
    border: "none",
    transition: "opacity 0.1s",
    fontFamily: "inherit",
  },
  func: { backgroundColor: "#a5a5a5", color: "#1c1c1c" },
  op: { backgroundColor: "#ff9f0a", color: "#fff" },
  num: { backgroundColor: "#333333", color: "#fff" },
  zero: { backgroundColor: "#333333", color: "#fff", width: "155px", borderRadius: "35px", justifyContent: "flex-start", paddingLeft: "25px" }
};

// 2. The Reusable Button Component (Child Component)
function Btn({ label, onClick, variant = "num" }) {
  const style = {
    ...btnStyles.base,
    ...btnStyles[variant]
  };

  return (
    <button style={style} onClick={() => onClick(label)}>
      {label}
    </button>
  );
}

// 3. The Main Calculator Component (Parent Component)
export default function Calculator() {
  // State variables to remember the current display, the previous number, and the active mathematical operation
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [resetOnNextInput, setResetOnNextInput] = useState(false);

  // Function to handle number inputs
  const handleNumber = (num) => {
    if (display === "0" || resetOnNextInput) {
      setDisplay(num);
      setResetOnNextInput(false);
    } else {
      setDisplay(display + num);
    }
  };

  // Function to handle operations (+, -, *, /)
  const handleOperation = (op) => {
    setPrevValue(parseFloat(display));
    setOperation(op);
    setResetOnNextInput(true);
  };

  // Function to calculate the final result (=)
  const calculate = () => {
    if (!operation || prevValue === null) return;
    
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case "+": result = prevValue + current; break;
      case "-": result = prevValue - current; break;
      case "×": result = prevValue * current; break;
      case "÷": result = current !== 0 ? prevValue / current : "Error"; break;
      default: return;
    }

    setDisplay(String(result));
    setPrevValue(null);
    setOperation(null);
    setResetOnNextInput(true);
  };

  // Function to reset everything (AC)
  const clearAll = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperation(null);
    setResetOnNextInput(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#000" }}>
      <div style={{ backgroundColor: "#000", width: "320px", padding: "20px", borderRadius: "20px", boxShadow: "0px 4px 20px rgba(255,255,255,0.1)" }}>
        
        {/* The Display Screen */}
        <div style={{ color: "#fff", fontSize: "48px", textAlign: "right", paddingRight: "10px", marginBottom: "20px", overflow: "hidden" }}>
          {display}
        </div>

        {/* The Button Grid Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          <Btn label="AC" variant="func" onClick={clearAll} />
          <Btn label="+/-" variant="func" onClick={() => setDisplay(String(parseFloat(display) * -1))} />
          <Btn label="%" variant="func" onClick={() => setDisplay(String(parseFloat(display) / 100))} />
          <Btn label="÷" variant="op" onClick={handleOperation} />

          <Btn label="7" onClick={handleNumber} />
          <Btn label="8" onClick={handleNumber} />
          <Btn label="9" onClick={handleNumber} />
          <Btn label="×" variant="op" onClick={handleOperation} />

          <Btn label="4" onClick={handleNumber} />
          <Btn label="5" onClick={handleNumber} />
          <Btn label="6" onClick={handleNumber} />
          <Btn label="-" variant="op" onClick={handleOperation} />

          <Btn label="1" onClick={handleNumber} />
          <Btn label="2" onClick={handleNumber} />
          <Btn label="3" onClick={handleNumber} />
          <Btn label="+" variant="op" onClick={handleOperation} />
        </div>

        {/* Bottom Row with wide zero button */}
        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          <Btn label="0" variant="zero" onClick={handleNumber} />
          <Btn label="." onClick={() => { if (!display.includes(".")) setDisplay(display + "."); }} />
          <Btn label="=" variant="op" onClick={calculate} />
        </div>

      </div>
    </div>
  );
}
