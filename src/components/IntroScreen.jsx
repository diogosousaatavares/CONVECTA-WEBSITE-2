import React, { useEffect, useState } from "react";

const SESSION_KEY = "convecta_intro_seen";

const MESSAGES = [
  "A preparar o ambiente…",
  "A carregar os componentes…",
  "A ajustar o layout…",
  "A calibrar a experiência…",
  "Quase pronto…",
];

export default function IntroScreen() {
  const [shouldRender, setShouldRender] = useState(false);
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem(SESSION_KEY) === "true"; } catch {}
    const isHome = window.location.pathname === "/";
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadySeen || !isHome || prefersReduced) { setDone(true); return; }

    setShouldRender(true);
    document.body.style.overflow = "hidden";

    // Progress animation — 0→100 over ~2400ms
    const startTime = performance.now();
    const duration = 2400;
    let raf;

    const tick = (now) => {
      const elapsed = now - startTime;
      const raw = Math.min(elapsed / duration, 1);
      // Ease in-out with a slight hold around 70%
      const eased = raw < 0.7
        ? raw * (1 / 0.7) * 0.75
        : 0.75 + (raw - 0.7) * (0.25 / 0.3);
      setProgress(Math.floor(eased * 100));
      setMsgIndex(Math.min(Math.floor(eased * MESSAGES.length), MESSAGES.length - 1));
      if (raw < 1) { raf = requestAnimationFrame(tick); }
    };
    raf = requestAnimationFrame(tick);

    // Exit at ~2600ms
    const exitTimer = setTimeout(() => {
      setProgress(100);
      setMsgIndex(MESSAGES.length - 1);
      setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
          try { sessionStorage.setItem(SESSION_KEY, "true"); } catch {}
        }, 700);
      }, 200);
    }, 2600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!shouldRender || done) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "#0d0d0d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.03)" : "scale(1)",
        transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: exiting ? "none" : "auto",
        overflow: "hidden",
      }}
    >
      {/* Aurora orbs behind */}
      <div style={{
        position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(254,233,109,0.12) 0%, transparent 70%)",
          top: "-150px", left: "50%", transform: "translateX(-50%)",
          animation: "introPulse 4s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(254,233,109,0.07) 0%, transparent 70%)",
          bottom: "-100px", right: "10%",
          animation: "introPulse 5s ease-in-out infinite 1s",
        }} />
      </div>

      {/* Centre content */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", position: "relative" }}>

        {/* Logo mark */}
        <div style={{
          opacity: progress > 10 ? 1 : 0,
          transform: progress > 10 ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <p style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px, 5vw, 42px)",
            color: "#ffffff",
            letterSpacing: "0.08em",
            margin: 0,
          }}>
            Convecta
          </p>
          <p style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#fee96d",
            opacity: 0.7,
            textAlign: "center",
            margin: "6px 0 0",
          }}>
            Arquitetura de Conversão
          </p>
        </div>

        {/* Big percentage */}
        <div style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(64px, 12vw, 110px)",
            color: "#fee96d",
            lineHeight: 1,
            margin: 0,
            letterSpacing: "-0.02em",
            textShadow: "0 0 60px rgba(254,233,109,0.3)",
            transition: "text-shadow 0.2s ease",
          }}>
            {progress}
            <span style={{ fontSize: "0.4em", color: "#fee96d", opacity: 0.7 }}>%</span>
          </p>
        </div>

        {/* Status message */}
        <p style={{
          fontSize: "11px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          margin: 0,
          minHeight: "16px",
          transition: "opacity 0.3s ease",
        }}>
          {MESSAGES[msgIndex]}
        </p>

        {/* Progress bar */}
        <div style={{
          width: "clamp(200px, 30vw, 320px)",
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "1px",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#fee96d",
            borderRadius: "1px",
            boxShadow: "0 0 8px rgba(254,233,109,0.6)",
            transition: "width 0.1s linear",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes introPulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; }
          50% { transform: translateX(-50%) scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
