import React from "react";
import { motion } from "framer-motion";

const variants = {
  fadeInUp: {
    initial: { opacity: 0, y: 60, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.88, filter: "blur(6px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  fadeIn: {
    initial: { opacity: 0, scale: 1.04, filter: "blur(4px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
  slideLeft: {
    initial: { opacity: 0, x: -50, filter: "blur(4px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
  slideRight: {
    initial: { opacity: 0, x: 50, filter: "blur(4px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "fadeInUp",
}) {
  const v = variants[variant] || variants.fadeInUp;
  return (
    <motion.div
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...v.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
