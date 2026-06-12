import { useState, useEffect, useRef } from "react";
import AmbientGlowBg from "./AmbientGlowBg"; 
import ConstellationBg from "./ConstellationBg"; 
import LeafWindBg from "./LeafWindBg"; 
import RainBg from "./RainBg";         

// 1. Premium 3D Skeuomorphic Theme Palettes
const themes = {
  light: {
    bodyBg: "#cbd5e1",
    calcBg: "linear-gradient(145deg, #ffffff 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)",         
    calcBorder: "1px solid #94a3b8",
    controlGroupBorder: "1px solid #94a3b8", 
    
    // 3D Milled Recess Screen Bezel Styles
    displayBg: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",      
    displayBorderTop: "3px solid #475569",    
    displayBorderLeft: "2px solid #475569",   
    displayBorderBottom: "2px solid #ffffff", 
    displayBorderRight: "2px solid #e2e8f0",
    displayText: "#38bdf8", 
    
    brandText: "#475569",
    brandShadow: "0px 1px 0px #ffffff", 
    controlText: "#64748b",
    
    // Mechanical Key Caps Styles & Layered Under-Shadows
    btnNumBg: "linear-gradient(180deg, #334155 0%, #1e293b 100%)",       
    btnNumText: "#ffffff",
    btnNumShadow: "0px 4px 0px #0f172a, 0px 5px 8px rgba(0,0,0,0.2)",

    btnFuncBg: "linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)",      
    btnFuncText: "#0f172a",
    btnFuncShadow: "0px 4px 0px #94a3b8, 0px 5px 8px rgba(0,0,0,0.15)",

    btnCheckBg: "linear-gradient(180deg, #4b5563 0%, #374151 100%)",
    btnCheckText: "#ffffff",
    btnCheckShadow: "0px 4px 0px #111827, 0px 5px 8px rgba(0,0,0,0.15)",

    btnOpBg: "linear-gradient(180deg, #ffb03a 0%, #ff9500 100%)",        
    btnOpText: "#ffffff",
    btnOpShadow: "0px 4px 0px #b45309, 0px 5px 8px rgba(0,0,0,0.2)",
    
    shadow: "0px 30px 60px rgba(15,23,42,0.3), inset 0px 3px 0px #ffffff, inset 0px -4px 10px rgba(0,0,0,0.15)"
  },
  dark: {
    bodyBg: "#020617",
    calcBg: "linear-gradient(145deg, #1e293b 0%, #0f172a 70%, #020617 100%)",         
    calcBorder: "1px solid #334155",
    controlGroupBorder: "1px solid #334155", 
    
    // Stealth Screen Frame Integration
    displayBg: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
    displayBorderTop: "2px solid #020617",
    displayBorderLeft: "2px solid #020617",
    displayBorderBottom: "1px solid #334155",
    displayBorderRight: "1px solid #334155",
    displayText: "#34d399", 
    
    brandText: "#94a3b8",
    brandShadow: "0px -1px 0px rgba(0,0,0,0.8)", 
    controlText: "#64748b",
    
    // High-Contrast Dark Mechanical Buttons
    btnNumBg: "linear-gradient(180deg, #334155 0%, #1e293b 100%)",
    btnNumText: "#ffffff",
    btnNumShadow: "0px 4px 0px #090d16, 0px 6px 10px rgba(0,0,0,0.5)",

    btnFuncBg: "linear-gradient(180deg, #475569 0%, #334155 100%)", 
    btnFuncText: "#ffffff", 
    btnFuncShadow: "0px 4px 0px #1e293b, 0px 6px 10px rgba(0,0,0,0.4)",

    btnCheckBg: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
    btnCheckText: "#34d399", 
    btnCheckShadow: "0px 4px 0px #020617, 0px 6px 10px rgba(0,0,0,0.5)",

    btnOpBg: "linear-gradient(180deg, #f97316 0%, #ea580c 100%)",   
    btnOpText: "#ffffff",
    btnOpShadow: "0px 4px 0px #7c2d12, 0px 6px 10px rgba(0,0,0,0.5)",
    
    shadow: "0px 30px 60px rgba(0,0,0,0.7), inset 0px 1px 2px rgba(255,255,255,0.1), inset 0px -5px 12px rgba(0,0,0,0.5)"
  }
};

// 2. High-Fidelity 3D Button Component
function Btn({ label, onClick, variant = "num", themeStyles, gridSpan = "auto" }) {
  let bg, color, baseShadow;

  if (variant === "func") {
    bg = themeStyles.btnFuncBg;
    color = themeStyles.btnFuncText;
    baseShadow = themeStyles.btnFuncShadow;
  } else if (variant === "op") {
    bg = themeStyles.btnOpBg;
    color = themeStyles.btnOpText;
    baseShadow = themeStyles.btnOpShadow;
  } else if (variant === "check") {
    bg = themeStyles.btnCheckBg;
    color = themeStyles.btnCheckText;
    baseShadow = themeStyles.btnCheckShadow;
  } else {
    bg = themeStyles.btnNumBg;
    color = themeStyles.btnNumText;
    baseShadow = themeStyles.btnNumShadow;
  }

  let fontSize = "20px";
  if (label.length > 3) {
    fontSize = "13px";
  } else if (variant === "check" || label === "Poly") {
    fontSize = "15px";
  }

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    width: "100%", 
    gridColumn: gridSpan,
    borderRadius: "18px", 
    fontSize: fontSize,
    fontWeight: "700",
    cursor: "pointer",
    border: "1px solid rgba(0,0,0,0.15)",
    backgroundColor: "transparent",
    backgroundImage: bg,
    color: color,
    boxShadow: baseShadow,
    transform: "translateY(0px)",
    transition: "transform 0.04s ease, box-shadow 0.04s ease",
    fontFamily: "inherit",
  };

  return (
    <button 
      className="calc-btn"
      style={style} 
      onClick={() => {
        onClick(label);
      }}
      onMouseDown={(e) => { 
        e.target.style.transform = "translateY(3px)"; 
        e.target.style.boxShadow = "0px 1px 0px rgba(0,0,0,0.5), inset 0px 2px 4px rgba(0,0,0,0.2)"; 
      }}
      onMouseUp={(e) => { 
        e.target.style.transform = "translateY(0px)"; 
        e.target.style.boxShadow = baseShadow; 
      }}
      onMouseLeave={(e) => { 
        e.target.style.transform = "translateY(0px)"; 
        e.target.style.boxShadow = baseShadow; 
      }}
    >
      {label}
    </button>
  );
}

// 3. Hacking Matrix Binary Rain Engine Component
function BinaryRainLoader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const rainDrops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "bold " + fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        if (Math.random() > 0.96) {
          ctx.fillStyle = "#ffffff";
        } else if (Math.random() > 0.4) {
          ctx.fillStyle = "#38bdf8";
        } else {
          ctx.fillStyle = "#0369a1";
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        backgroundColor: "#000000"
      }}
    />
  );
}

// 4. Main Hardware Component
export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [resetOnNextInput, setResetOnNextInput] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [polyMode, setPolyMode] = useState(null); 
  const [polyA, setPolyA] = useState(null);
  const [polyB, setPolyB] = useState(null);

  const [isMuted, setIsMuted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [iconRotation, setIconRotation] = useState(0);
  const [solarBars, setSolarBars] = useState(4);

  // Default straight to structural kill switch configuration
  const [quantumMode, setQuantumMode] = useState("killed"); 
  const [pressTime, setPressTime] = useState(0);

  const [showLoading, setShowLoading] = useState(true);
  const [fadeLoading, setFadeLoading] = useState(false);

  // Local public asset buffers
  const [clickAudio] = useState(() => {
    return new Audio("/click.mp3");
  });
  const [forestTrack] = useState(() => { 
    const a = new Audio("/forest.mp3"); 
    a.loop = true; 
    return a; 
  });
  const [rainTrack] = useState(() => { 
    const a = new Audio("/rain.mp3"); 
    a.loop = true; 
    return a; 
  });

  const t = themes[currentTheme];

  // Entry loader transition timers
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeLoading(true);
      const removeTimer = setTimeout(() => {
        setShowLoading(false);
      }, 800); 
      return () => {
        clearTimeout(removeTimer);
      };
    }, 2500); 

    return () => {
      clearTimeout(fadeTimer);
    };
  }, []);

  // Global Audio Switch State Controller Loop
  useEffect(() => {
    if (isMuted || quantumMode === "killed" || quantumMode === "default") {
      forestTrack.pause();
      rainTrack.pause();
    } else {
      if (quantumMode === "forest") {
        rainTrack.pause();
        forestTrack.play().catch((e) => {
          console.log("Audio loop delayed:", e);
        });
      } else if (quantumMode === "rain") {
        forestTrack.pause();
        rainTrack.play().catch((e) => {
          console.log("Audio loop delayed:", e);
        });
      }
    }
  }, [quantumMode, isMuted, forestTrack, rainTrack]);

  useEffect(() => {
    return () => { 
      forestTrack.pause(); 
      rainTrack.pause(); 
    };
  }, [forestTrack, rainTrack]);

  useEffect(() => {
    const updateSolarPower = () => {
      const hours = new Date().getHours();
      if (hours >= 6 && hours < 12) {
        setSolarBars(4);
      } else if (hours >= 12 && hours < 16) {
        setSolarBars(3);
      } else if (hours >= 16 && hours < 19) {
        setSolarBars(2);
      } else {
        setSolarBars(0);
      }                                 
    };
    updateSolarPower();
    const interval = setInterval(updateSolarPower, 60000); 
    return () => {
      clearInterval(interval);
    };
  }, []);

  const toggleTheme = () => {
    playClickSound();
    setIconRotation((prev) => {
      return prev + 360;
    });
    setCurrentTheme((prev) => {
      if (prev === "light") {
        return "dark";
      } else {
        return "light";
      }
    });
  };

  const toggleMuteState = () => {
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);
    if (nextMuteState) {
      clickAudio.pause();
      forestTrack.pause();
      rainTrack.pause();
    } else {
      if (quantumMode === "forest") {
        forestTrack.play().catch((e) => {
          console.log(e);
        });
      }
      if (quantumMode === "rain") {
        rainTrack.play().catch((e) => {
          console.log(e);
        });
      }
    }
  };

  const playClickSound = () => {
    if (isMuted) {
      return;
    }
    clickAudio.currentTime = 0;
    clickAudio.play().catch((err) => {
      console.log("Audio context blocked:", err);
    });
  };

  const handleQuantumPressStart = () => {
    setPressTime(Date.now());
  };

  const handleQuantumPressEnd = () => {
    if (!pressTime) {
      return;
    }
    const duration = Date.now() - pressTime;
    setPressTime(0);

    if (duration >= 5000) {
      setQuantumMode("rain");
      forestTrack.pause();
      if (!isMuted) {
        rainTrack.currentTime = 0;
        rainTrack.play().then(() => {
          console.log("Storm Active");
        }).catch((e) => {
          console.log("Audio track error:", e);
        });
      }
      return;
    }

    if (duration >= 3000) {
      setQuantumMode("forest");
      rainTrack.pause();
      if (!isMuted) {
        forestTrack.currentTime = 0;
        forestTrack.play().then(() => {
          console.log("Forest Active");
        }).catch((e) => {
          console.log("Audio track error:", e);
        });
      }
      return;
    }

    setQuantumMode((prev) => {
      if (prev === "killed") {
        return "default";
      } else {
        return "killed";
      }
    });
    forestTrack.pause();
    rainTrack.pause();
    playClickSound();
  };

  const handleNumberInput = (num) => { 
    playClickSound(); 
    handleNumber(num); 
  };
  
  const handleOperationInput = (op) => { 
    playClickSound(); 
    handleOperation(op); 
  };
  
  const handleClearInput = () => { 
    playClickSound(); 
    clearAll(); 
  };
  
  const handleEqualInput = () => { 
    playClickSound(); 
    calculate(); 
  };

  const evaluateExpression = (expr) => {
    let sanitized = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/²/g, "**2");
    const safeRegex = /^[0-9+\-*/().\s**]+$/;
    if (!safeRegex.test(sanitized)) {
      return "Error";
    }
    try {
      // eslint-disable-next-line no-new-func
      const result = new Function(`return (${sanitized})`)();
      if (result === Infinity || isNaN(result)) {
        return "Error";
      }
      return String(result);
    } catch (e) { 
      return "Error"; 
    }
  };

  const handleNumber = (num) => {
    const prompts = ["a = ?", "b = ?", "c = ?"];
    if (display === "0" || resetOnNextInput || historyIndex !== -1 || prompts.includes(display) || display === "Error") {
      setDisplay(num);
      setResetOnNextInput(false);
      setHistoryIndex(-1); 
    } else {
      const lastChar = display.slice(-1);
      if (lastChar === ")" || lastChar === "²") {
        setDisplay(display + " × " + num);
      } else {
        setDisplay(display + num);
      }
    }
  };

  const handleOperation = (op) => {
    const prompts = ["a = ?", "b = ?", "c = ?"];
    if (prompts.includes(display) || display === "Error" || display.includes("x")) {
      return;
    }
    const trimmed = display.trim();
    if (["+", "-", "×", "÷"].includes(trimmed.slice(-1))) {
      const tokens = trimmed.split(/\s+/);
      tokens[tokens.length - 1] = op;
      setDisplay(tokens.join(" ") + " ");
    } else {
      setDisplay(display + " " + op + " ");
    }
    setResetOnNextInput(false);
    setHistoryIndex(-1);
  };

  const handleParenthesis = (p) => {
    playClickSound();
    const prompts = ["a = ?", "b = ?", "c = ?"];
    if (prompts.includes(display) || display === "Error") {
      return;
    }

    if (display === "0" || resetOnNextInput || historyIndex !== -1) {
      setDisplay(p);
      setResetOnNextInput(false);
      setHistoryIndex(-1);
    } else {
      const lastChar = display.slice(-1);
      if (p === "(" && /[0-9)³²]/.test(lastChar)) {
        setDisplay(display + " × (");
      } else {
        setDisplay(display + p);
      }
    }
  };

  const handleSquare = () => {
    playClickSound();
    const prompts = ["a = ?", "b = ?", "c = ?"];
    if (prompts.includes(display) || display === "Error" || display === "0") {
      return;
    }
    if (["+", "-", "×", "÷", "(", " "].includes(display.slice(-1))) {
      return;
    }
    setDisplay(display + "²");
    setResetOnNextInput(false);
    setHistoryIndex(-1);
  };

  const handleSquareRoot = () => {
    playClickSound();
    const prompts = ["a = ?", "b = ?", "c = ?"];
    if (prompts.includes(display) || display === "Error") {
      return;
    }
    const currentTotal = parseFloat(evaluateExpression(display));
    if (isNaN(currentTotal) || currentTotal < 0) { 
      setDisplay("Error"); 
    } else {
      const result = Math.sqrt(currentTotal);
      setDisplay(String(result));
      setHistory((prev) => {
        return [...prev, `√(${display}) = ${result}`];
      });
      setHistoryIndex(-1);
    }
    setResetOnNextInput(true);
  };

  const startPolynomialSolver = () => {
    playClickSound(); 
    setPolyMode("a"); 
    setDisplay("a = ?"); 
    setResetOnNextInput(true);
  };

  const handleBackspace = () => {
    playClickSound();
    const prompts = ["a = ?", "b = ?", "c = ?"];
    if (prompts.includes(display) || historyIndex !== -1 || display === "Error") {
      return;
    }
    const trimmed = display.trim();
    const tokens = trimmed.split(/\s+/);
    if (["+", "-", "×", "÷"].includes(tokens[tokens.length - 1])) {
      tokens.pop();
      if (tokens.join(" ") === "") {
        setDisplay("0");
      } else {
        setDisplay(tokens.join(" "));
      }
    } else {
      if (display.length > 1) {
        let updated = display.slice(0, -1);
        if (updated.slice(-1) === " ") {
          updated = updated.trim();
        }
        if (updated === "") {
          setDisplay("0");
        } else {
          setDisplay(updated);
        }
      } else { 
        setDisplay("0"); 
      }
    }
  };

  const calculate = () => {
    if (polyMode === "a") { 
      setPolyA(parseFloat(display)); 
      setPolyMode("b"); 
      setDisplay("b = ?"); 
      setResetOnNextInput(true); 
      return; 
    }
    if (polyMode === "b") { 
      setPolyB(parseFloat(display)); 
      setPolyMode("c"); 
      setDisplay("c = ?"); 
      setResetOnNextInput(true); 
      return; 
    }
    if (polyMode === "c") {
      const c = parseFloat(display); 
      const a = polyA; 
      const b = polyB; 
      if (a === 0) { 
        setDisplay("Invalid (a=0)"); 
        setPolyMode(null); 
        return; 
      }
      const discriminant = b * b - 4 * a * c;
      let resultStr = "";
      if (discriminant >= 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        if (root1 === root2) {
          resultStr = `x = ${root1}`;
        } else {
          resultStr = `x1=${root1.toFixed(2)}, x2=${root2.toFixed(2)}`;
        }
      } else {
        const realPart = (-b / (2 * a)).toFixed(2); 
        const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);
        resultStr = `x1=${realPart}+${imagPart}i, x2=${realPart}-${imagPart}i`;
      }
      setDisplay(resultStr);
      setHistory((prev) => {
        return [...prev, `${a}x² + ${b}x + ${c} = 0 → ${resultStr}`];
      });
      setPolyMode(null); 
      setPolyA(null); 
      setPolyB(null); 
      setHistoryIndex(-1); 
      setResetOnNextInput(true); 
      return;
    }

    const currentExpression = display;
    const resultStr = evaluateExpression(currentExpression);
    setDisplay(resultStr);
    if (resultStr !== "Error" && currentExpression !== resultStr) {
      setHistory((prev) => {
        return [...prev, `${currentExpression.trim()} = ${resultStr}`];
      });
    }
    setHistoryIndex(-1); 
    setResetOnNextInput(true);
  };

  const handleHistoryUp = () => {
    playClickSound(); 
    if (history.length === 0) {
      return;
    }
    let newIndex = historyIndex === -1 ? history.length - 1 : historyIndex - 1;
    if (newIndex >= 0) { 
      setHistoryIndex(newIndex); 
      setDisplay(history[newIndex]); 
    }
  };

  const handleHistoryDown = () => {
    playClickSound(); 
    if (history.length === 0 || historyIndex === -1) {
      return;
    }
    let newIndex = historyIndex + 1;
    if (newIndex < history.length) { 
      setHistoryIndex(newIndex); 
      setDisplay(history[newIndex]); 
    } else { 
      setHistoryIndex(-1); 
      setDisplay("0"); 
    }
  };

  const clearAll = () => {
    setDisplay("0"); 
    setResetOnNextInput(false); 
    setPolyMode(null); 
    setPolyA(null); 
    setPolyB(null); 
    setHistoryIndex(-1); 
  };

  const getQuantumIcon = () => {
    if (quantumMode === "forest") {
      return <span style={{ display: "inline-block", animation: "swayLeaf 2s infinite ease-in-out", fontSize: "16px" }}>🍃</span>;
    }
    if (quantumMode === "rain") {
      return <span style={{ display: "inline-block", animation: "bounceDrop 1.2s infinite ease-in-out", fontSize: "15px" }}>💧</span>;
    }
    
    let strokeColor = "#cbd5e1";
    if (quantumMode === "killed") {
      if (currentTheme === "light") {
        strokeColor = "#94a3b8";
      } else {
        strokeColor = "#475569";
      }
    } else {
      if (currentTheme === "light") {
        strokeColor = "#334155";
      } else {
        strokeColor = "#cbd5e1";
      }
    }
      
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" style={{ animation: quantumMode === "killed" ? "none" : "spinAtom 6s infinite linear", display: "block" }}>
        <circle cx="12" cy="12" r="1.8" fill={strokeColor} />
        <ellipse cx="12" cy="12" rx="9" ry="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3" fill="none" stroke={strokeColor} strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3" fill="none" stroke={strokeColor} strokeWidth="1.5" transform="rotate(120 12 12)" />
      </svg>
    );
  };

  const getQuantumBtnStyle = () => {
    const isLight = currentTheme === "light";
    const baseCircle = {
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      userSelect: "none",
      borderRadius: "50%",
      transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)"
    };

    if (quantumMode === "forest") {
      return {
        ...baseCircle,
        background: "linear-gradient(135deg, #047857 0%, #10b981 100%)",
        border: "1px solid #065f46",
        boxShadow: "0px 0px 14px rgba(16,185,129,0.85), inset 0px 1px 2px rgba(255,255,255,0.6)",
        transform: "scale(1.06)"
      };
    }
    if (quantumMode === "rain") {
      return {
        ...baseCircle,
        background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", 
        border: "1px solid #075985",
        boxShadow: "0px 0px 14px rgba(14,165,233,0.75), inset 0px 1px 2px rgba(255,255,255,0.5)",
        transform: "scale(1.06)"
      };
    }
    
    let boxS = "0px 2px 3px rgba(0,0,0,0.3)";
    if (quantumMode === "killed") {
      boxS = "inset 0px 2px 3px rgba(0,0,0,0.2)";
    } else if (isLight) {
      boxS = "0px 2px 3px rgba(0,0,0,0.1), inset 0px 1px 0px #ffffff";
    }

    return {
      ...baseCircle,
      background: isLight 
        ? "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)" 
        : "linear-gradient(180deg, #334155 0%, #1e293b 100%)",
      border: "1px solid rgba(0,0,0,0.15)",
      boxShadow: boxS
    };
  };

  // Complete Physical Keyboard Event Capture Board System
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/[0-9]/.test(e.key)) { 
        e.preventDefault(); 
        handleNumberInput(e.key); 
      } else if (e.key === "+") { 
        e.preventDefault(); 
        handleOperationInput("+"); 
      } else if (e.key === "-") { 
        e.preventDefault(); 
        handleOperationInput("-"); 
      } else if (e.key === "*") { 
        e.preventDefault(); 
        handleOperationInput("×"); 
      } else if (e.key === "/") { 
        e.preventDefault(); 
        handleOperationInput("÷"); 
      } else if (e.key === "9" && e.shiftKey) { 
        e.preventDefault(); 
        handleParenthesis("("); 
      } else if (e.key === "0" && e.shiftKey) { 
        e.preventDefault(); 
        handleParenthesis(")"); 
      } else if (e.key === "Enter" || e.key === "=") { 
        e.preventDefault(); 
        handleEqualInput(); 
      } else if (e.key === "Backspace") { 
        e.preventDefault(); 
        handleBackspace(); 
      } else if (e.key === "Escape") { 
        e.preventDefault(); 
        handleClearInput(); 
      } else if (e.key === ".") { 
        e.preventDefault(); 
        playClickSound(); 
        if (!display.includes(".")) {
          setDisplay((prev) => {
            return prev + ".";
          });
        }
      } else if (e.key === "ArrowUp") { 
        e.preventDefault(); 
        handleHistoryUp(); 
      } else if (e.key === "ArrowDown") { 
        e.preventDefault(); 
        handleHistoryDown(); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, polyMode, polyA, polyB, history, historyIndex, isMuted, resetOnNextInput, currentTheme, quantumMode]);

  return (
    <div className="calc-outer" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: t.bodyBg, transition: "background-color 0.3s", overflow: "hidden", position: "relative" }}>
      <style>{`
        @keyframes spinAtom { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes swayLeaf { 0%, 100% { transform: rotate(-15deg); } 50% { transform: rotate(20deg) scale(1.08); } }
        @keyframes bounceDrop { 0%, 100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(3px) scaleY(0.88) scaleX(1.06); } }
        @keyframes blinkCursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* HIGH-FIDELITY ANDROID RESPONSIVE SCALE ENGINE Overrides */
        @media (max-width: 500px) {
          .calc-outer { 
            padding: 0 !important; 
          }
          .calc-card {
            width: 100% !important; 
            max-width: 100% !important; 
            height: 100vh !important; 
            border-radius: 0px !important;
            border: none !important; 
            box-shadow: none !important; 
            padding: 16px 14px !important; 
            box-sizing: border-box !important;
            display: flex !important; 
            flex-direction: column !important;
          }
          .lcd-screen { 
            height: 90px !important; 
            max-height: 90px !important; 
            font-size: 42px !important; 
            margin-top: auto !important; 
            margin-bottom: 18px !important; 
          }
          .keypad-matrix { 
            display: grid !important; 
            grid-template-rows: repeat(6, 1fr) !important; 
            gap: 12px 10px !important; 
            height: 62vh !important; 
          }
          .calc-btn { 
            height: 100% !important; 
            font-size: 24px !important; 
            border-radius: 15px !important; 
            touch-action: manipulation !important; 
          }
          .system-zone { 
            gap: 10px !important; 
            padding: 6px 4px !important; 
          }
        }
      `}</style>

      {/* State-Dependent Environment Background Router Matrix */}
      {quantumMode === "default" && <AmbientGlowBg currentTheme={currentTheme} />}
      {quantumMode === "default" && <ConstellationBg currentTheme={currentTheme} />}
      {quantumMode === "forest" && <LeafWindBg currentTheme={currentTheme} />}
      {quantumMode === "rain" && <RainBg currentTheme={currentTheme} />}

      <div className="calc-card" style={{ background: t.calcBg, width: "330px", padding: "28px 22px", borderRadius: "32px", border: t.calcBorder, boxShadow: t.shadow, transition: "all 0.3s", zIndex: 1, position: "relative" }}>
        
        {/* HARDWARE CIRCUIT LED INDICATOR */}
        {(quantumMode === "forest" || quantumMode === "rain") && (
          <div style={{
            position: "absolute", top: "8px", right: "12px", width: "7px", height: "7px", borderRadius: "50%",
            backgroundColor: quantumMode === "forest" ? "#10b981" : "#3b82f6",
            boxShadow: quantumMode === "forest" ? "0px 0px 8px #10b981, inset 0px 1px 1px rgba(255,255,255,0.6)" : "0px 0px 8px #3b82f6, inset 0px 1px 1px rgba(255,255,255,0.6)",
            transition: "all 0.3s ease"
          }} />
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <span style={{ color: t.brandText, fontSize: "13px", fontWeight: "800", letterSpacing: "1.5px", fontFamily: "system-ui, sans-serif", textShadow: t.brandShadow, opacity: 0.9 }}>CALCULATOR</span>
          <div style={{ display: "flex", gap: "4px", backgroundColor: currentTheme === "light" ? "#2d221f" : "#020617", padding: "6px 12px", borderRadius: "5px", border: "1px solid rgba(0,0,0,0.2)", boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.4)" }}>
            {[1, 2, 3, 4].map((barIndex) => (
              <div key={barIndex} style={{ width: "11px", height: "18px", backgroundColor: barIndex <= solarBars ? "#10b981" : "rgba(255,255,255,0.05)", transition: "background-color 0.5s ease", borderRight: "1px solid rgba(0,0,0,0.15)" }} />
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: t.brandText, fontSize: "13px", fontWeight: "800", letterSpacing: "1px", fontFamily: "system-ui, sans-serif", textShadow: t.brandShadow, opacity: 0.9 }}>RDJ-3000</span>
            <button
              onMouseDown={handleQuantumPressStart} 
              onMouseUp={handleQuantumPressEnd} 
              onMouseLeave={() => {
                setPressTime(0);
              }} 
              onTouchStart={(e) => { 
                e.preventDefault(); 
                handleQuantumPressStart(); 
              }} 
              onTouchEnd={(e) => { 
                e.preventDefault(); 
                handleQuantumPressEnd(); 
              }}
              style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", userSelect: "none", transition: "all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)", ...getQuantumBtnStyle() }}
            >
              {getQuantumIcon()}
            </button>
          </div>
        </div>

        {/* ---📟 3D LCD SCREEN --- */}
        <div className="lcd-screen" style={{ 
          background: t.displayBg, color: t.displayText, fontSize: "32px", fontWeight: "600", fontFamily: "'Courier New', Courier, monospace",
          display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "0px 15px", borderRadius: "14px", marginBottom: "15px", height: "64px", maxHeight: "64px",
          borderTop: t.displayBorderTop, borderLeft: t.displayBorderLeft, borderBottom: t.displayBorderBottom, borderRight: t.displayBorderRight,
          boxShadow: "inset 0px 6px 12px rgba(0,0,0,0.95), 0px 1px 2px rgba(255,255,255,0.15)", textShadow: currentTheme === "light" ? "0px 0px 8px rgba(56,189,248,0.5)" : "0px 0px 8px rgba(52,211,153,0.5)",
          whiteSpace: "nowrap", overflowX: "hidden", boxSizing: "border-box"
        }}>
          <span>{display}</span>
          <span style={{ display: "inline-block", width: "3px", height: "22px", backgroundColor: t.displayText, marginLeft: "3px", animation: "blinkCursor 1s steps(2, start) infinite", verticalAlign: "middle" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", color: t.controlText, fontSize: "9px", fontWeight: "800", letterSpacing: "0.6px", marginBottom: "6px", paddingRight: "4px" }}>
          CHECK i-CORRECT
        </div>

        {/* --- KEYPAD GRID MATRIX --- */}
        <div className="keypad-matrix" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px 12px" }}>
          <div className="system-zone" style={{
            gridColumn: "span 4", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", border: t.controlGroupBorder, padding: "8px 6px", borderRadius: "22px",
            backgroundColor: currentTheme === "light" ? "rgba(0,0,0,0.02)" : "rgba(0,0,0,0.18)", boxShadow: "inset 0px 3px 6px rgba(0,0,0,0.15), 0px 1px 0px rgba(255,255,255,0.4)"
          }}>
            <Btn label="AC" variant="func" themeStyles={t} onClick={handleClearInput} />
            <Btn label="DEL" variant="func" themeStyles={t} onClick={handleBackspace} />
            <Btn label="▲" variant="check" themeStyles={t} onClick={handleHistoryUp} />
            <Btn label="▼" variant="check" themeStyles={t} onClick={handleHistoryDown} />
          </div>

          <Btn label="+/-" variant="func" themeStyles={t} onClick={() => { playClickSound(); const tot = evaluateExpression(display); setDisplay(String(parseFloat(tot) * -1)); }} />
          <Btn label="√" variant="func" themeStyles={t} onClick={handleSquareRoot} />
          <Btn label="x²" variant="func" themeStyles={t} onClick={handleSquare} />
          <Btn label="Poly" variant="func" themeStyles={t} onClick={startPolynomialSolver} />

          <Btn label="(" variant="func" themeStyles={t} onClick={() => handleParenthesis("(")} />
          <Btn label=")" variant="func" themeStyles={t} onClick={() => handleParenthesis(")")} />
          <Btn label="%" variant="func" themeStyles={t} onClick={() => { playClickSound(); const tot = evaluateExpression(display); setDisplay(String(parseFloat(tot) / 100)); }} />
          <Btn label="÷" variant="op" themeStyles={t} onClick={handleOperationInput} />

          <Btn label="7" themeStyles={t} onClick={handleNumberInput} />
          <Btn label="8" themeStyles={t} onClick={handleNumberInput} />
          <Btn label="9" themeStyles={t} onClick={handleNumberInput} />
          <Btn label="×" variant="op" themeStyles={t} onClick={handleOperationInput} />

          <Btn label="4" themeStyles={t} onClick={handleNumberInput} />
          <Btn label="5" themeStyles={t} onClick={handleNumberInput} />
          <Btn label="6" themeStyles={t} onClick={handleNumberInput} />
          <Btn label="-" variant="op" themeStyles={t} onClick={handleOperationInput} />

          <Btn label="1" themeStyles={t} onClick={handleNumberInput} />
          <Btn label="2" themeStyles={t} onClick={handleNumberInput} />
          <Btn label="3" themeStyles={t} onClick={handleNumberInput} />
          <Btn label="+" variant="op" themeStyles={t} onClick={handleOperationInput} />

          <Btn label="0" themeStyles={t} gridSpan="span 2" onClick={handleNumberInput} />
          <Btn label="." themeStyles={t} onClick={() => { playClickSound(); if (!display.includes(".")) setDisplay(prev => prev + "."); }} />
          <Btn label="=" variant="op" themeStyles={t} onClick={handleEqualInput} />
        </div>

        {/* --- PANEL BASE UTILITY FOOTER --- */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "24px", marginTop: "22px", borderTop: `1px solid ${currentTheme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`, paddingTop: "14px" }}>
          <button onClick={toggleMuteState} style={{ backgroundColor: "transparent", border: "none", color: t.controlText, fontSize: "14px", fontWeight: "700", cursor: "pointer", width: "110px", textAlign: "center" }}>
            {isMuted ? "🔈 Muted" : "🔊 Sound On"}
          </button>
          <div style={{ width: "1px", height: "14px", backgroundColor: currentTheme === "light" ? "#cbd5e1" : "#475569" }} />
          <button onClick={toggleTheme} style={{ backgroundColor: "transparent", border: "none", color: t.controlText, fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", width: "110px" }}>
            <span style={{ display: "inline-block", transform: `rotate(${iconRotation}deg)`, transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)", fontSize: "16px" }}>{currentTheme === "light" ? "🌙" : "☀️"}</span>Theme
          </button>
        </div>

      </div>

      {/* Full-Screen Intercepting Binary Loading Overlay Matrix */}
      {showLoading && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 99999, pointerEvents: "none", opacity: fadeLoading ? 0 : 1, transition: "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)" }}>
          <BinaryRainLoader />
        </div>
      )}
    </div>
  );
}