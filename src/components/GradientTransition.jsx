import React from "react";

export default function GradientTransition({ from = "#1a1a1a", to = "#ffffff", direction = "left" }) {
  const clipPath =
    direction === "left"
      ? "polygon(0 0, 100% 0, 100% 100%, 0 60%)"
      : "polygon(0 0, 100% 0, 100% 60%, 0 100%)";

  return (
    <div aria-hidden="true" className="w-full" style={{ height: "64px", background: to }}>
      <div style={{ height: "100%", background: from, clipPath }} />
    </div>
  );
}