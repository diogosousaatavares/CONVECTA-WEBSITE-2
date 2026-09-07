import React, { useRef, useState, useCallback } from "react";

export default function TiltCard({ children, className = "", dark = false, glowColor = "rgba(254,233,109,0.15)" }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)" });
    setGlowPos((p) => ({ ...p, opacity: 0 }));
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-150 ease-out ${className}`}
      style={{
        ...style,
        willChange: "transform",
        background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
        boxShadow: dark ? "0 8px 32px rgba(0,0,0,0.3)" : "0 8px 32px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glowPos.opacity,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}