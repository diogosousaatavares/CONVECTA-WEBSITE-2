import React, { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px]"
      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      aria-hidden="true"
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(90deg, #fee96d, #fff3b0)",
          boxShadow: "0 0 8px rgba(254,233,109,0.6)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
