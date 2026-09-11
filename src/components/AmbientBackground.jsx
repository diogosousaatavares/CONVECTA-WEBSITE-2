import React from "react";

/**
 * AmbientBackground
 * Dynamic aurora-like gradient orbs — Convecta palette (#fee96d, black).
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
      {/* Top-left warm orb — large, bright, fast */}
      <div style={{
        position: "absolute",
        width: "900px",
        height: "900px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(254,233,109,0.13) 0%, rgba(254,233,109,0.04) 45%, transparent 70%)",
        top: "-250px",
        left: "-200px",
        animation: "auroraFloat1 10s ease-in-out infinite",
      }} />

      {/* Top-right accent orb */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(254,233,109,0.09) 0%, rgba(254,233,109,0.03) 50%, transparent 70%)",
        top: "0vh",
        right: "-120px",
        animation: "auroraFloat2 12s ease-in-out infinite",
      }} />

      {/* Centre drift orb — slow, sweeping */}
      <div style={{
        position: "absolute",
        width: "1000px",
        height: "1000px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(254,233,109,0.07) 0%, transparent 60%)",
        top: "25vh",
        left: "50%",
        transform: "translateX(-50%)",
        animation: "auroraFloat3 14s ease-in-out infinite",
      }} />

      {/* Bottom-right orb */}
      <div style={{
        position: "absolute",
        width: "750px",
        height: "750px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(254,233,109,0.11) 0%, rgba(254,233,109,0.03) 50%, transparent 70%)",
        bottom: "-150px",
        right: "-130px",
        animation: "auroraFloat1 11s ease-in-out infinite 2s",
      }} />

      {/* Bottom-left orb */}
      <div style={{
        position: "absolute",
        width: "550px",
        height: "550px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(254,233,109,0.08) 0%, transparent 65%)",
        bottom: "5vh",
        left: "-100px",
        animation: "auroraFloat2 13s ease-in-out infinite 4s",
      }} />

      {/* Mid-page roaming orb — adds depth */}
      <div style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(254,233,109,0.06) 0%, transparent 65%)",
        top: "55vh",
        left: "20%",
        animation: "auroraFloat4 16s ease-in-out infinite 6s",
      }} />

      <style>{`
        @keyframes auroraFloat1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(60px, -50px) scale(1.1); }
          55%  { transform: translate(-30px, 40px) scale(0.94); }
          80%  { transform: translate(40px, 20px) scale(1.05); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes auroraFloat2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          30%  { transform: translate(-70px, 50px) scale(1.12); }
          65%  { transform: translate(50px, -30px) scale(0.92); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes auroraFloat3 {
          0%   { transform: translateX(-50%) scale(1); }
          35%  { transform: translateX(calc(-50% + 90px)) scale(1.08); }
          70%  { transform: translateX(calc(-50% - 60px)) scale(0.95); }
          100% { transform: translateX(-50%) scale(1); }
        }
        @keyframes auroraFloat4 {
          0%   { transform: translate(0px, 0px) scale(1); }
          40%  { transform: translate(80px, -60px) scale(1.15); }
          75%  { transform: translate(-40px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="auroraFloat"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
