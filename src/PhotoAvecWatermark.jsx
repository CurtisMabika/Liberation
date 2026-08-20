import React from "react";

export default function PhotoAvecWatermark({ src, alt, style }) {
  return (
    <div style={{ position: "relative", display: "inline-block", width: "100%", height: "100%" }}>
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", display: "block", ...style }} />
      <img
        src="/watermark-logo.png"
        alt=""
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: "18%",
          maxWidth: 60,
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
