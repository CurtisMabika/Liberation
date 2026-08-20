import React, { useState } from "react";
import galerieOfficielle from "./galerieOfficielleData";
import PhotoAvecWatermark from "./PhotoAvecWatermark";

const COLORS_OR = "#c8960c";
const COLORS_JAUNE = "#fcd116";
const COLORS_VERT = "#009e60";

export default function GalerieOfficielle({ onClose }) {
  const [photoPleine, setPhotoPleine] = useState(null);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 40%, #0a1520 100%)",
      overflowY: "auto", padding: "24px", paddingBottom: "120px",
    }}>
      <h2 style={{ fontSize: 26, color: COLORS_JAUNE, marginBottom: 8, fontWeight: "bold" }}>📸 Galerie officielle</h2>
      <p style={{ color: "rgba(240,234,214,0.55)", marginBottom: 24, fontSize: 14 }}>
        Les moments forts de la Fête de la Libération 2026
      </p>

      {galerieOfficielle.every((section) => section.photos.length === 0) && (
        <p style={{ color: "rgba(240,234,214,0.5)", textAlign: "center", marginTop: 40 }}>
          Les photos officielles seront ajoutées ici au fil de l'événement.
        </p>
      )}

      {galerieOfficielle.map((section, si) => (
        section.photos.length > 0 && (
          <div key={si} style={{ marginBottom: 28 }}>
            <h3 style={{ color: COLORS_VERT, fontSize: 16, marginBottom: 12, fontWeight: "bold" }}>{section.titre}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8 }}>
              {section.photos.map((photo, pi) => (
                <div
                  key={pi}
                  onClick={() => setPhotoPleine(photo.src)}
                  style={{ borderRadius: 8, overflow: "hidden", cursor: "pointer", border: `1px solid ${COLORS_OR}`, aspectRatio: "1 / 1" }}
                >
                  <PhotoAvecWatermark src={photo.src} alt={section.titre} />
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      <button onClick={onClose} style={{
        position: "fixed", bottom: "max(90px, env(safe-area-inset-bottom, 24px) + 70px)", right: 24,
        background: COLORS_VERT, border: "none", color: "#fff",
        borderRadius: 50, padding: "12px 20px", fontSize: 14,
        cursor: "pointer", fontFamily: "inherit", fontWeight: "bold",
        boxShadow: "0 4px 15px rgba(0,0,0,0.4)", zIndex: 10001,
      }}>← Retour</button>

      {photoPleine && (
        <div onClick={() => setPhotoPleine(null)} style={{
          position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.95)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "pointer",
        }}>
          <img src={photoPleine} alt="" style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: 10, objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
}
