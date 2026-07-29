import React, { useState } from "react";
import realisationsParVille from "./realisationsData";

const COLORS_OR = "#c8960c";
const COLORS_JAUNE = "#fcd116";
const COLORS_VERT = "#009e60";

const VILLES = Object.keys(realisationsParVille);

export default function GalerieRealisations({ onClose }) {
  const [step, setStep] = useState("villes"); // villes | realisations | media
  const [villeActive, setVilleActive] = useState(null);
  const [realisationActive, setRealisationActive] = useState(null);
  const [mediaPlein, setMediaPlein] = useState(null); // { type, src }

  const bg = "linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 40%, #0a1520 100%)";

  const choisirVille = (ville) => {
    setVilleActive(ville);
    setStep("realisations");
  };

  const choisirRealisation = (real) => {
    setRealisationActive(real);
    setStep("media");
  };

  const retour = () => {
    if (mediaPlein) { setMediaPlein(null); return; }
    if (step === "media") { setStep("realisations"); setRealisationActive(null); }
    else if (step === "realisations") { setStep("villes"); setVilleActive(null); }
    else onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, background: bg, overflowY: "auto", padding: "24px", paddingBottom: "100px" }}>

      {step === "villes" && (
        <>
          <h2 style={{ fontSize: 26, color: COLORS_JAUNE, marginBottom: 8, fontWeight: "bold" }}>📸 Réalisations du Président</h2>
          <p style={{ color: "rgba(240,234,214,0.55)", marginBottom: 24, fontSize: 14 }}>Choisis une ville pour découvrir ses réalisations</p>
          <div style={{ display: "grid", gap: 14 }}>
            {VILLES.map((ville) => (
              <div
                key={ville}
                onClick={() => choisirVille(ville)}
                style={{
                  background: "rgba(0,158,96,0.1)", border: `1px solid ${COLORS_OR}`,
                  borderRadius: 14, padding: "20px 18px", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                <span style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>{ville}</span>
                <span style={{ color: COLORS_JAUNE, fontSize: 13 }}>
                  {realisationsParVille[ville].length > 0 ? `${realisationsParVille[ville].length} réalisation(s) →` : "Bientôt disponible"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {step === "realisations" && villeActive && (
        <>
          <h2 style={{ fontSize: 26, color: COLORS_JAUNE, marginBottom: 8, fontWeight: "bold" }}>Réalisations à {villeActive}</h2>
          <p style={{ color: "rgba(240,234,214,0.55)", marginBottom: 24, fontSize: 14 }}>
            {realisationsParVille[villeActive].length} projet(s) réalisé(s) ou en cours
          </p>
          {realisationsParVille[villeActive].length === 0 && (
            <p style={{ color: "rgba(240,234,214,0.5)", textAlign: "center", marginTop: 40 }}>
              Les réalisations de cette ville seront bientôt ajoutées.
            </p>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            {realisationsParVille[villeActive].map((real, i) => (
              <div
                key={i}
                onClick={() => choisirRealisation(real)}
                style={{
                  position: "relative", aspectRatio: "1 / 1", borderRadius: 12, overflow: "hidden",
                  border: `1px solid ${COLORS_OR}`, cursor: "pointer",
                }}
              >
                <img src={real.photos[0]} alt={real.titre} style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                }} />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  padding: "24px 10px 10px", color: "#fff", fontSize: 12, fontWeight: "bold", textAlign: "center",
                }}>
                  {real.titre}
                </div>
                {real.videos.length > 0 && (
                  <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.6)", borderRadius: 20, padding: "2px 8px", fontSize: 11, color: "#fff" }}>
                    🎥 {real.videos.length}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {step === "media" && realisationActive && (
        <>
          <h2 style={{ fontSize: 24, color: COLORS_JAUNE, marginBottom: 12, fontWeight: "bold" }}>{realisationActive.titre}</h2>
          <p style={{ color: "rgba(240,234,214,0.75)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
            {realisationActive.texte}
          </p>

          {realisationActive.videos.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: COLORS_VERT, fontSize: 13, fontWeight: "bold", marginBottom: 10, textTransform: "uppercase" }}>🎥 Vidéos</div>
              <div style={{ display: "grid", gap: 12 }}>
                {realisationActive.videos.map((v, i) => (
                  <video key={i} src={v} controls style={{ width: "100%", borderRadius: 10, background: "#000" }} />
                ))}
              </div>
            </div>
          )}

          <div style={{ color: COLORS_VERT, fontSize: 13, fontWeight: "bold", marginBottom: 10, textTransform: "uppercase" }}>📷 Photos</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 8 }}>
            {realisationActive.photos.map((p, i) => (
              <div key={i} onClick={() => setMediaPlein({ type: "photo", src: p })} style={{ borderRadius: 8, overflow: "hidden", cursor: "pointer" }}>
                <img src={p} alt="" style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </>
      )}

      
      {mediaPlein && (
        <div onClick={() => setMediaPlein(null)} style={{
          position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.95)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "pointer",
        }}>
          <img src={mediaPlein.src} alt="" style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: 10, objectFit: "contain" }} />
        </div>
      )}

      <button onClick={retour} style={{
        position: "fixed", bottom: "max(90px, env(safe-area-inset-bottom, 24px) + 70px)", right: 24,
        background: COLORS_VERT, border: "none", color: "#fff",
        borderRadius: 50, padding: "12px 20px", fontSize: 14,
        cursor: "pointer", fontFamily: "inherit", fontWeight: "bold",
        boxShadow: "0 4px 15px rgba(0,0,0,0.4)", zIndex: 10001,
      }}>← Retour</button>
    </div>
  );
}
