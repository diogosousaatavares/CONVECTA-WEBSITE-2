import React, { useEffect, useRef } from "react";

/*
 * O fundo do hero: linhas em profundidade, a andar devagar.
 *
 * As linhas correm para dentro do ecra e, projetadas, convergem para o
 * centro — e isso que da a sensacao de espaco. De vez em quando uma delas
 * acende e uma luz atravessa-a, na cor da Convecta.
 *
 * Regras: fica clarissimo (e fundo, nao e conteudo), nunca apanha o rato, e
 * para de mexer se a pessoa pediu menos animacao nas definicoes do sistema.
 */

const AMARELO = [254, 233, 109];
const LINHAS = 38;
const PROF = 1400;   // profundidade da cena
const DIST = 620;    // distancia focal da perspetiva

function novaLinha(largura, alt) {
  const ang = Math.random() * Math.PI * 2;
  const raio = 120 + Math.pow(Math.random(), 0.6) * Math.max(largura, alt) * 0.95;
  return {
    x: Math.cos(ang) * raio,
    y: Math.sin(ang) * raio * 0.62,
    z: Math.random() * PROF,
    comprimento: 260 + Math.random() * 520,
    vel: 22 + Math.random() * 30,
    luz: null,
    proximaLuz: 1 + Math.random() * 16,
  };
}

export default function FundoLinhas() {
  const ref = useRef(null);

  useEffect(() => {
    const tela = ref.current;
    if (!tela) return;
    const ctx = tela.getContext("2d");
    const parado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let largura = 0, alt = 0, dpr = 1, linhas = [], animacao = 0;
    let anterior = performance.now();

    function medir() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = tela.clientWidth;
      alt = tela.clientHeight;
      if (!largura || !alt) return;
      tela.width = Math.round(largura * dpr);
      tela.height = Math.round(alt * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      linhas = Array.from({ length: LINHAS }, () => novaLinha(largura, alt));
    }

    function projetar(x, y, z) {
      const k = DIST / (DIST + z);
      return [largura / 2 + x * k, alt / 2 + y * k, k];
    }

    function desenhar(agora) {
      const dt = Math.min((agora - anterior) / 1000, 0.05);
      anterior = agora;
      ctx.clearRect(0, 0, largura, alt);

      for (const l of linhas) {
        if (!parado) {
          l.z -= l.vel * dt;
          if (l.z + l.comprimento < -DIST * 0.85) {
            Object.assign(l, novaLinha(largura, alt), { z: PROF });
          }
          if (l.luz === null) {
            l.proximaLuz -= dt;
            if (l.proximaLuz <= 0) l.luz = 0;
          } else {
            l.luz += dt * 0.55;
            if (l.luz > 1.25) { l.luz = null; l.proximaLuz = 6 + Math.random() * 16; }
          }
        }

        const [x1, y1, k1] = projetar(l.x, l.y, l.z + l.comprimento);
        const [x2, y2, k2] = projetar(l.x, l.y, l.z);
        if (k1 <= 0.02 || k2 <= 0.02) continue;

        ctx.strokeStyle = `rgba(36, 32, 28, ${Math.max(0, Math.min(1, k2)) * 0.16})`;
        ctx.lineWidth = Math.max(0.4, k2 * 1.2);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        if (l.luz !== null && l.luz >= 0 && l.luz <= 1) {
          const p = l.luz, rasto = 0.22;
          const a = Math.max(0, p - rasto);
          const ax = x1 + (x2 - x1) * a, ay = y1 + (y2 - y1) * a;
          const bx = x1 + (x2 - x1) * p, by = y1 + (y2 - y1) * p;
          const brilho = Math.sin(Math.min(p, 1) * Math.PI) * Math.min(1, k2 * 1.6);

          const g = ctx.createLinearGradient(ax, ay, bx, by);
          g.addColorStop(0, `rgba(${AMARELO.join(",")},0)`);
          g.addColorStop(1, `rgba(${AMARELO.join(",")},${0.95 * brilho})`);
          ctx.strokeStyle = g;
          ctx.lineWidth = Math.max(1.1, k2 * 2.8);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();

          ctx.fillStyle = `rgba(${AMARELO.join(",")},${0.9 * brilho})`;
          ctx.shadowColor = `rgba(${AMARELO.join(",")},${0.8 * brilho})`;
          ctx.shadowBlur = 16 * Math.min(1, k2);
          ctx.beginPath();
          ctx.arc(bx, by, Math.max(1.3, k2 * 2.6), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animacao = requestAnimationFrame(desenhar);
    }

    medir();
    animacao = requestAnimationFrame(desenhar);
    const aoRedimensionar = () => medir();
    window.addEventListener("resize", aoRedimensionar);
    return () => {
      cancelAnimationFrame(animacao);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}
