import React from "react";

/**
 * AmbientBackground
 * Fixed aurora-like gradient orbs — Convecta palette (#fee96d, black).
 * Sits behind all content at z-index 0.
 */
export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Top-left warm orb */}
      <div style={{
        position: "absolute",
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(254,233,109,0.06) 0%, transparent 65%)",
        top: "-200px",
        left: "-150px",
        animation: "auroraFloat1 18s ease-in-out infinite",
      }} />

      {/* Top-right soft orb */}
      <div style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(254,233,109,0.04) 0%, transparent 65%)",
        top: "5vh",
        right: "-100px",
        animation: "auroraFloat2 22s ease-in-out infinite",
      }} />

      {/* Centre drift orb */}
      <div style={{
        position: "absolute",
        width: "800px",
        height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(254,233,109,0.03) 0%, transparent 60%)",
        top: "30vh",
        left: "50%",
        transform: "translateX(-50%)",
        animation: "auroraFloat3 26s ease-in-out infinite",
      }} />

      {/* Bottom-right orb */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(254,233,109,0.05) 0%, transparent 65%)",
        bottom: "-100px",
        right: "-100px",
        animation: "auroraFloat1 20s ease-in-out infinite 4s",
      }} />

      {/* Bottom-left orb */}
      <div style={{
        position: "absolute",
        width: "450px",
        height: "450px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(254,233,109,0.04) 0%, transparent 65%)",
        bottom: "10vh",
        left: "-80px",
        animation: "auroraFloat2 24s ease-in-out infinite 8s",
      }} />

      <style>{`
        @keyframes auroraFloat1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(40px, -30px) scale(1.05); }
          66%  { transform: translate(-20px, 20px) scale(0.97); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes auroraFloat2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          40%  { transform: translate(-50px, 30px) scale(1.08); }
          70%  { transform: translate(30px, -20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes auroraFloat3 {
          0%   { transform: translateX(-50%) scale(1); }
          50%  { transform: translateX(calc(-50% + 60px)) scale(1.06); }
          100% { transform: translateX(-50%) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="auroraFloat"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
