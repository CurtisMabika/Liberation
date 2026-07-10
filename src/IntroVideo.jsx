import React, { useState, useRef } from "react";

export default function IntroVideo({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const videoRef = useRef(null);

  const fermer = () => {
    setVisible(false);
    setTimeout(onFinish, 400);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.4s ease",
    }}>
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        playsInline
        muted={false}
        onEnded={fermer}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <button
        onClick={fermer}
        style={{
          position: "fixed",
          top: 24,
          right: 24,
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.4)",
          color: "#fff",
          borderRadius: 50,
          padding: "10px 18px",
          fontSize: 14,
          fontWeight: "bold",
          cursor: "pointer",
          fontFamily: "inherit",
          zIndex: 201,
        }}
      >
        Passer →
      </button>
    </div>
  );
}
