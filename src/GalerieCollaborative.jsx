import React, { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

const COLORS_OR = "#fcd116";
const CLOUD_NAME = "vvj3nux7";
const UPLOAD_PRESET = "Makokou2026";

export default function GalerieCollaborative({ onClose }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nom, setNom] = useState("");
  const [fichier, setFichier] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [photoActive, setPhotoActive] = useState(null);

  const cardStyle = {
    background: "linear-gradient(135deg, rgba(0,158,96,0.12), rgba(252,209,22,0.06))",
    border: `2px solid ${COLORS_OR}`,
    borderRadius: 16,
    padding: 24,
    color: "#fff",
  };

  const chargerPhotos = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "galerieCollab"), orderBy("date", "desc"), limit(60));
      const snap = await getDocs(q);
      setPhotos(snap.docs.map((d) => d.data()));
    } catch (e) {
      console.error("Erreur chargement galerie:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    chargerPhotos();
  }, []);

  const envoyerPhoto = async () => {
    if (!fichier || !nom.trim()) {
      setError("Ajoute ton nom et choisis une photo avant d'envoyer.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", fichier);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.secure_url) throw new Error("Échec de l'envoi");

      await addDoc(collection(db, "galerieCollab"), {
        url: data.secure_url,
        uploaderNom: nom.trim(),
        date: serverTimestamp(),
      });

      setFichier(null);
      setNom("");
      chargerPhotos();
    } catch (e) {
      console.error("Erreur envoi photo:", e);
      setError("L'envoi a échoué. Réessaie dans un instant.");
    }
    setUploading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ ...cardStyle, maxWidth: 480, width: "100%", maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ color: COLORS_OR, margin: 0, fontSize: 20 }}>📷 Galerie des visiteurs</h2>
          <span onClick={onClose} style={{ cursor: "pointer", fontSize: 22 }}>✕</span>
        </div>

        <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>
          Partage tes plus belles photos de la Fête de la Libération !
        </p>

        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: 14, marginBottom: 20 }}>
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ton nom"
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.3)", color: "#fff", marginBottom: 10, boxSizing: "border-box" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFichier(e.target.files[0])}
            style={{ width: "100%", color: "#fff", marginBottom: 10, fontSize: 13 }}
          />
          <button
            onClick={envoyerPhoto}
            disabled={uploading}
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "none", background: COLORS_OR, color: "#1a2e1a", fontWeight: "bold", cursor: "pointer", opacity: uploading ? 0.6 : 1 }}
          >
            {uploading ? "Envoi en cours..." : "📤 Partager ma photo"}
          </button>
          {error && <div style={{ color: "#ff8080", fontSize: 12, marginTop: 8 }}>{error}</div>}
        </div>

        {loading && <p style={{ opacity: 0.6, fontSize: 13 }}>Chargement de la galerie...</p>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 8 }}>
          {photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setPhotoActive(photo.url)}
              style={{ borderRadius: 8, overflow: "hidden", cursor: "pointer", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <img src={photo.url} alt="" style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>

        {!loading && photos.length === 0 && (
          <p style={{ opacity: 0.5, fontSize: 13, textAlign: "center", marginTop: 20 }}>
            Sois le premier à partager une photo !
          </p>
        )}
      </div>

      {photoActive && (
        <div onClick={() => setPhotoActive(null)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "pointer" }}>
          <img src={photoActive} alt="" style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: 10, objectFit: "contain" }} />
        </div>
      )}
    </div>
  );
}
