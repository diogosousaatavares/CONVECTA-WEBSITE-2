import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const INSTAGRAM_URL = "https://instagram.com/convecta.pt";
const AUTOPLAY_MS = 4000;

export default function InstagramCarousel({ images }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const next = () => setActive((a) => (a + 1) % images.length);
  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);

  // Autoplay
  useEffect(() => {
    if (isPaused || !images || images.length <= 1) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    timeoutRef.current = setTimeout(() => {
      setActive((a) => (a + 1) % images.length);
    }, AUTOPLAY_MS);

    return () => clearTimeout(timeoutRef.current);
  }, [active, isPaused, images]);

  const handleManualNav = (fn) => {
    setIsPaused(true);
    fn();
    // Resume autoplay after a pause window
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsPaused(false), 6000);
  };

  if (!images || images.length === 0) return null;

  // Build a window of 3 cards: prev, active, next
  const getOffset = (i) => {
    const diff = i - active;
    const len = images.length;
    if (diff === 0) return 0;
    if (diff === 1 || diff === -(len - 1)) return 1;
    if (diff === -1 || diff === len - 1) return -1;
    return null; // hidden
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative h-[340px] sm:h-[420px] lg:h-[480px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {images.map((img, i) => {
          const offset = getOffset(i);
          if (offset === null) return null;

          const isActive = offset === 0;
          const translateX = offset * 58;
          const scale = isActive ? 1 : 0.82;
          const rotateY = offset * -16;
          const zIndex = isActive ? 30 : 10;
          const opacity = isActive ? 1 : 0.45;

          return (
            <a
              key={img.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!isActive) {
                  e.preventDefault();
                  handleManualNav(() => setActive(i));
                }
              }}
              className="absolute w-[220px] sm:w-[300px] lg:w-[340px] aspect-square rounded-sm overflow-hidden transition-all duration-700 ease-out"
              style={{
                transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
                zIndex,
                opacity,
                filter: isActive ? "blur(0px)" : "blur(1.5px)",
                boxShadow: isActive
                  ? "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(254,233,109,0.2)"
                  : "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={img.image_url}
                alt="Publicação Convecta no Instagram"
                loading="lazy"
                className="w-full h-full object-cover"
                draggable={false}
              />
              {isActive && (
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "rgba(26,26,26,0.5)" }}
                >
                  <ArrowUpRight size={26} className="text-mustard" strokeWidth={2} />
                </div>
              )}
            </a>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => handleManualNav(prev)}
          aria-label="Post anterior"
          className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <ChevronLeft size={18} className="text-white" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManualNav(() => setActive(i))}
              aria-label={`Ir para post ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? "18px" : "6px",
                height: "6px",
                backgroundColor: i === active ? "#fee96d" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => handleManualNav(next)}
          aria-label="Próximo post"
          className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <ChevronRight size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}
