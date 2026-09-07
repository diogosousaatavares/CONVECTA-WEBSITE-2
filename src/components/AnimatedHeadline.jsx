import React from "react";
import { motion } from "framer-motion";

export default function AnimatedHeadline({ children, className = "" }) {
  const words = children.split(" ");

  return (
    <h1 className={className}>
      {words.map((word, i) => {
        const isYellow = word.includes("«") || word.includes("»");
        const cleanWord = word.replace(/«|»/g, "");
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            className="inline-block mr-[0.25em]"
          >
            {isYellow ? <span style={{ color: "#fee96d" }}>{cleanWord}</span> : cleanWord}
          </motion.span>
        );
      })}
    </h1>
  );
}