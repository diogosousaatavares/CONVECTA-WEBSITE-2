import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    document.body.classList.add("custom-cursor-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onOver = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea, select")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] transition-all duration-200 ease-out"
        style={{
          width: hovering ? "44px" : "28px",
          height: hovering ? "44px" : "28px",
          marginLeft: hovering ? "-22px" : "-14px",
          marginTop: hovering ? "-22px" : "-14px",
          borderRadius: "9999px",
          border: `1.5px solid ${hovering ? "#fee96d" : "rgba(254,233,109,0.4)"}`,
          backgroundColor: hovering ? "rgba(254,233,109,0.1)" : "transparent",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: "6px",
          height: "6px",
          marginLeft: "-3px",
          marginTop: "-3px",
          borderRadius: "9999px",
          backgroundColor: "#fee96d",
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}