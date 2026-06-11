export default function AmbientGlowBg({ currentTheme }) {
  const isLight = currentTheme === "light";

  // Dynamic color states that align perfectly with the RDJ-3000 chassis palettes
  const styles = {
    blob1: isLight ? "rgba(56, 189, 248, 0.25)" : "rgba(52, 211, 153, 0.2)", // Ice blue vs Emerald green
    blob2: isLight ? "rgba(255, 149, 0, 0.15)" : "rgba(234, 88, 12, 0.15)", // Orange hardware accents
    blob3: isLight ? "rgba(148, 163, 184, 0.3)" : "rgba(15, 23, 42, 0.8)",
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      overflow: "hidden",
      pointerEvents: "none",
      transition: "background-color 0.4s ease",
    }}>
      {/* Structural Inject for the smooth drifting keyframe animations */}
      <style>{`
        @keyframes floatBlob1 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes floatBlob2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-40px, 40px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>

      {/* Ambient Aura Orb 1 */}
      <div style={{
        position: "absolute",
        top: "15%",
        left: "20%",
        width: "350px",
        height: "350px",
        backgroundColor: styles.blob1,
        borderRadius: "50%",
        filter: "blur(80px)",
        animation: "floatBlob1 12s infinite ease-in-out",
        transition: "background-color 0.4s ease",
      }} />

      {/* Ambient Aura Orb 2 */}
      <div style={{
        position: "absolute",
        bottom: "20%",
        right: "15%",
        width: "400px",
        height: "400px",
        backgroundColor: styles.blob2,
        borderRadius: "50%",
        filter: "blur(90px)",
        animation: "floatBlob2 16s infinite ease-in-out",
        transition: "background-color 0.4s ease",
      }} />
    </div>
  );
}