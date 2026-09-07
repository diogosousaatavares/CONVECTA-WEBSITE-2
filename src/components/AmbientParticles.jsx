import React, { useMemo } from "react";

export default function AmbientParticles({ count = 8, className = "" }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: 3 + ((i * 7) % 5),
        left: (i * 137.5) % 100, // golden angle distribution
        top: (i * 71) % 100,
        duration: 5 + (i % 4) * 1.5,
        delay: i * 0.4,
      })),
    [count]
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: "rgba(254,233,109,0.35)",
            animation: `ambientFloat ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes ambientFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-24px) translateX(8px); opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="ambientFloat"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
