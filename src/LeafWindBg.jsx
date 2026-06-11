import { useEffect, useRef } from "react";

export default function LeafWindBg({ currentTheme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const isLight = currentTheme === "light";
    const leafColor = isLight ? "rgba(4, 120, 87, 0.2)" : "rgba(16, 185, 129, 0.2)";

    const leaves = [];
    const count = 8; // Strict low count for a subtle, premium drift effect

    for (let i = 0; i < count; i++) {
      leaves.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 0.4 + 0.4,
        speedY: Math.random() * 0.1 + 0.1,
        sway: Math.random() * 100,
        swaySpeed: Math.random() * 0.01 + 0.005
      });
    }

    const drawLeaf = (ctx, x, y, size) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + size, y - size / 2, x + size * 2, y);
      ctx.quadraticCurveTo(x + size, y + size / 2, x, y);
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = leafColor;

      leaves.forEach(l => {
        l.x += l.speedX;
        l.sway += l.swaySpeed;
        l.y += l.speedY + Math.sin(l.sway) * 0.15;

        // Reset positions seamlessly once off screen bounds
        if (l.x > canvas.width) { l.x = -20; l.y = Math.random() * canvas.height; }
        if (l.y > canvas.height) l.y = -20;

        drawLeaf(ctx, l.x, l.y, l.size);
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