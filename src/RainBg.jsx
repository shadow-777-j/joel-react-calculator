import { useEffect, useRef } from "react";

export default function RainBg({ currentTheme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const isLight = currentTheme === "light";
    const rainColor = isLight ? "rgba(2, 132, 199, 0.35)" : "rgba(14, 165, 233, 0.35)";

    const drops = [];
    const count = 140; // Exaggerated storm particle footprint 🌧️

    for (let i = 0; i < count; i++) {
      drops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        length: Math.random() * 25 + 15,
        speedY: Math.random() * 10 + 14, // High velocity downward drop speed
        speedX: -2.5 // Wind tilt factor angle
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = rainColor;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      drops.forEach(d => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.speedX, d.y + d.length);
        ctx.stroke();

        d.y += d.speedY;
        d.x += d.speedX;

        if (d.y > canvas.height) {
          d.y = -30;
          d.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTheme]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}