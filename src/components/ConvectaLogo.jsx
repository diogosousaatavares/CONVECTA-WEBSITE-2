import React from "react";

const LOGO_URL = "/brand/convecta-logo.png";

export default function ConvectaLogo({ light = true, size = "default" }) {
  const heightClass = size === "small" ? "h-10" : "h-14";
  return (
    <img
      src={LOGO_URL}
      alt="Convecta logo"
      className={`${heightClass} w-auto`}
    />
  );
}