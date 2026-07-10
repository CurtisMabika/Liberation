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
        style={{position: "fixed",
          bottom: "max(100px, env(safe-area-inset-bottom, 24px) + 100px)",
          right: 05,
          background: "#009e60",
          border: "2px solid #fcd116",
          color: "#fff",
          borderRadius: 50,
          padding: "14px 32px",
          fontSize: 16,
          fontWeight: "bold",
          cursor: "pointer",
          fontFamily: "inherit",
          zIndex: 201,
          boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}
      >
        Passer l'intro →
      </button>
    </div>
  );
}
