import React, { useState } from "react";
import galerieOfficielle from "./galerieOfficielleData";
import PhotoAvecWatermark from "./PhotoAvecWatermark";

const COLORS_OR = "#c8960c";
const COLORS_JAUNE = "#fcd116";
const COLORS_VERT = "#009e60";

export default function GalerieOfficielle({ onClose }) {
  const [evenementActif, setEvenementActif] = useState(null);
  const [photoPleine, setPhotoPleine] = useState(null);

  const retour = () => {
    if (photoPleine) { setPhotoPleine(null); return; }
    if (evenementActif) { setEvenementActif(null); return; }
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 40%, #0a1520 100%)",
      overflowY: "auto", padding: "24px", paddingBottom: "120px",
    }}>
      {!evenementActif ? (
        <>
          <h2 style={{ fontSize: 26, color: COLORS_JAUNE, marginBottom: 8, fontWeight: "bold" }}>📸 Galerie officielle</h2>
          <p style={{ color: "rgba(240,234,214,0.55)", marginBottom: 24, fontSize: 14 }}>
            Les moments forts de la Fête de la Libération 2026
          </p>

          {galerieOfficielle.every((section) => section.photos.length === 0) && (
            <p style={{ color: "rgba(240,234,214,0.5)", textAlign: "center", marginTop: 40 }}>
              Les photos officielles seront ajoutées ici au fil de l'événement.
            </p>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
                        {galerieOfficielle.filter((s) => s.photos.length > 0).map((section, si) => (
              <div
                key={si}
                onClick={() => setEvenementActif(section)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ marginBottom: 8, textAlign: "center", minHeight: 48, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  {section.date && (
                    <div style={{ fontSize: 11, color: COLORS_JAUNE, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>
                      {section.date}
                    </div>
                  )}
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: "bold", lineHeight: 1.3 }}>
                    {section.titre}
                  </div>
                </div>
                <div style={{
                  position: "relative", aspectRatio: "1 / 1", borderRadius: 12, overflow: "hidden",
                  border: `2px solid ${COLORS_OR}`, boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}>
                  <img src={section.photos[0].src} alt={section.titre} style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                  }} />
                  <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", borderRadius: 20, padding: "2px 8px", fontSize: 11, color: "#fff" }}>
                    📷 {section.photos.length}
                  </div>
                </div>
              </div>
            ))}          </div>
        </>
      ) : (
        <>
          <h2 style={{ fontSize: 22, color: COLORS_JAUNE, marginBottom: 20, fontWeight: "bold" }}>{evenementActif.titre}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8 }}>
            {evenementActif.photos.map((photo, pi) => (
              <div
                key={pi}
                onClick={() => setPhotoPleine(photo.src)}
                style={{ borderRadius: 8, overflow: "hidden", cursor: "pointer", border: `1px solid ${COLORS_OR}`, aspectRatio: "1 / 1" }}
              >
                <PhotoAvecWatermark src={photo.src} alt={evenementActif.titre} />
              </div>
            ))}
          </div>
        </>
      )}

      <button onClick={retour} style={{
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
