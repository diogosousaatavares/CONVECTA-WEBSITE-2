import React, { useRef, useState, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";

const INSTAGRAM_URL = "https://instagram.com/convecta.pt";

function TiltPost({ img }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`,
    });
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setStyle({ transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)" });
    setGlow((g) => ({ ...g, opacity: 0 }));
  }, []);

  return (
    <a
      ref={ref}
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-square overflow-hidden group block transition-transform duration-150 ease-out"
      style={{ ...style, willChange: "transform", zIndex: glow.opacity ? 20 : 1 }}
    >
      <img
        src={img.image_url}
        alt="Publicação Convecta no Instagram"
        loading="lazy"
        className="w-full h-full object-cover"
        draggable={false}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(254,233,109,0.25), transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        style={{ backgroundColor: "rgba(26,26,26,0.45)" }}
      >
        <ArrowUpRight size={28} className="text-mustard" strokeWidth={2} />
      </div>
    </a>
  );
}

export default function InstagramGrid({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" style={{ perspective: "1000px" }}>
      {images.map((img) => (
        <TiltPost key={img.id} img={img} />
      ))}
    </div>
  );
}