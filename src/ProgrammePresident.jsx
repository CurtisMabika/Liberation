import React from "react";
import programmePresident from "./programmePresidentData";

const COLORS_OR = "#c8960c";
const COLORS_JAUNE = "#fcd116";
const COLORS_VERT = "#009e60";

export default function ProgrammePresident({ onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 60,
      background: "linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 40%, #0a1520 100%)",
      overflowY: "auto", padding: "24px", paddingBottom: "120px",
    }}>
      <h2 style={{ fontSize: 24, color: COLORS_JAUNE, marginBottom: 4, fontWeight: "bold" }}>
        Séjour du Président de la République
      </h2>
      <p style={{ color: "rgba(240,234,214,0.55)", marginBottom: 28, fontSize: 13 }}>
        Programme officiel du 27 au 31 août 2026 dans l'Ogooué-Ivindo
      </p>

      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: 15, top: 8, bottom: 8, width: 2,
          background: `linear-gradient(to bottom, ${COLORS_VERT}, ${COLORS_JAUNE}, "#003082")`,
          borderRadius: 2,
        }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {programmePresident.map((jour, ji) => (
            <div key={ji} style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{ width: 32, flexShrink: 0, display: "flex", justifyContent: "center" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: COLORS_VERT, border: `2px solid ${COLORS_JAUNE}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: "bold", color: "#fff", zIndex: 1, position: "relative",
                  textAlign: "center", lineHeight: 1.1, padding: 2,
                }}>{jour.date.split(" ")[1]}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: COLORS_JAUNE, fontWeight: "bold", fontSize: 14, marginBottom: 2 }}>
                  {jour.date}
                </div>
                <div style={{ color: "rgba(240,234,214,0.6)", fontSize: 12, fontStyle: "italic", marginBottom: 10 }}>
                  {jour.sousTitre}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {jour.items.map((item, ii) => (
                    <div key={ii} style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(200,150,12,0.18)", borderRadius: 12, padding: "12px 16px",
                    }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                        {item.heure && (
                          <span style={{
                            background: COLORS_VERT, color: "#fff",
                            borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: "bold",
                          }}>{item.heure}</span>
                        )}
                        <span style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>{item.titre}</span>
                      </div>
                      {item.details.length > 0 && (
                        <ul style={{ margin: "8px 0 0", paddingLeft: 18, color: "rgba(240,234,214,0.6)", fontSize: 12, lineHeight: 1.7 }}>
                          {item.details.map((d, di) => (
                            <li key={di}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onClose} style={{
        position: "fixed", bottom: "max(90px, env(safe-area-inset-bottom, 24px) + 70px)", right: 24,
        background: COLORS_VERT, border: "none", color: "#fff",
        borderRadius: 50, padding: "12px 20px", fontSize: 14,
        cursor: "pointer", fontFamily: "inherit", fontWeight: "bold",
        boxShadow: "0 4px 15px rgba(0,0,0,0.4)", zIndex: 10001,
      }}>← Retour</button>
    </div>
  );
}
