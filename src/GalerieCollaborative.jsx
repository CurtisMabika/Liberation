import React, { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, query, orderBy, limit, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

const COLORS_OR = "#fcd116";
const CLOUD_NAME = "vvj3nux7";
const UPLOAD_PRESET = "Makokou2026";
const ADMIN_PASSWORD = "COCO2018";

export default function GalerieCollaborative({ onClose }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nom, setNom] = useState("");
  const [fichier, setFichier] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [photoActive, setPhotoActive] = useState(null);
  const [mesPhotos, setMesPhotos] = useState([]);

  const [photoASupprimer, setPhotoASupprimer] = useState(null); // photo en attente de confirmation
  const [demandeMotDePasse, setDemandeMotDePasse] = useState(false);
  const [motDePasseSaisi, setMotDePasseSaisi] = useState("");
  const [erreurMotDePasse, setErreurMotDePasse] = useState("");

  const cardStyle = {
    background: "linear-gradient(135deg, rgba(0,158,96,0.12), rgba(252,209,22,0.06))",
    border: `2px solid ${COLORS_OR}`,
    borderRadius: 16,
    padding: 24,
    color: "#fff",
  };

  useEffect(() => {
    try {
      const stockees = JSON.parse(localStorage.getItem("mesPhotosGalerie") || "[]");
      setMesPhotos(stockees);
    } catch (e) {
      setMesPhotos([]);
    }
  }, []);

  const chargerPhotos = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "galerieCollab"), orderBy("date", "desc"), limit(60));
      const snap = await getDocs(q);
      setPhotos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
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

      const docRef = await addDoc(collection(db, "galerieCollab"), {
        url: data.secure_url,
        uploaderNom: nom.trim(),
        date: serverTimestamp(),
      });

      const nouvelleListe = [...mesPhotos, docRef.id];
      setMesPhotos(nouvelleListe);
      localStorage.setItem("mesPhotosGalerie", JSON.stringify(nouvelleListe));

      setFichier(null);
      setNom("");
      chargerPhotos();
    } catch (e) {
      console.error("Erreur envoi photo:", e);
      setError("L'envoi a échoué. Réessaie dans un instant.");
    }
    setUploading(false);
  };

  // Étape 1 : l'utilisateur clique sur la poubelle -> on ouvre la confirmation personnalisée
  const demanderSuppression = (photo) => {
    setPhotoASupprimer(photo);
    setErreurMotDePasse("");
    setMotDePasseSaisi("");
    setDemandeMotDePasse(false);
  };

  // Étape 2 : l'utilisateur confirme -> soit suppression directe (sa photo), soit demande de mot de passe
  const confirmerSuppression = () => {
    if (!photoASupprimer) return;
    const estMaPhoto = mesPhotos.includes(photoASupprimer.id);
    if (estMaPhoto) {
      executerSuppression(photoASupprimer);
    } else {
      setDemandeMotDePasse(true);
    }
  };

  const validerMotDePasse = () => {
    if (motDePasseSaisi !== ADMIN_PASSWORD) {
      setErreurMotDePasse("Mot de passe incorrect.");
      return;
    }
    executerSuppression(photoASupprimer);
  };

  const executerSuppression = async (photo) => {
    try {
      await deleteDoc(doc(db, "galerieCollab", photo.id));
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
      const estMaPhoto = mesPhotos.includes(photo.id);
      if (estMaPhoto) {
        const nouvelleListe = mesPhotos.filter((id) => id !== photo.id);
        setMesPhotos(nouvelleListe);
        localStorage.setItem("mesPhotosGalerie", JSON.stringify(nouvelleListe));
      }
      setPhotoActive(null);
    } catch (e) {
      console.error("Erreur suppression:", e);
    } finally {
      setPhotoASupprimer(null);
      setDemandeMotDePasse(false);
      setMotDePasseSaisi("");
      setErreurMotDePasse("");
    }
  };

  const annulerSuppression = () => {
    setPhotoASupprimer(null);
    setDemandeMotDePasse(false);
    setMotDePasseSaisi("");
    setErreurMotDePasse("");
  };

  return (
        <div style={{ position: "fixed", inset: 0, zIndex: 10002, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
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
          {photos.map((photo) => (
            <div
              key={photo.id}
              style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <img
                src={photo.url}
                alt=""
                onClick={() => setPhotoActive(photo)}
                style={{ width: "100%", height: 100, objectFit: "cover", display: "block", cursor: "pointer" }}
              />
              <div
                onClick={() => demanderSuppression(photo)}
                style={{
                  position: "absolute", top: 4, right: 4,
                  background: "rgba(0,0,0,0.6)", borderRadius: "50%",
                  width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: 12,
                }}
              >
                🗑
              </div>
            </div>
          ))}
        </div>

        {!loading && photos.length === 0 && (
          <p style={{ opacity: 0.5, fontSize: 13, textAlign: "center", marginTop: 20 }}>
            Sois le premier à partager une photo !
          </p>
        )}
      </div>

           {photoActive && !photoASupprimer && (
        <div onClick={() => setPhotoActive(null)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.95)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <img src={photoActive.url} alt="" style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 10, objectFit: "contain" }} onClick={(e) => e.stopPropagation()} />
          <button
            onClick={(e) => { e.stopPropagation(); demanderSuppression(photoActive); }}
            style={{
              marginTop: 16, background: "rgba(200,0,0,0.7)", border: "none", color: "#fff",
              borderRadius: 50, padding: "10px 20px", fontSize: 13, cursor: "pointer", fontWeight: "bold",
            }}
          >
            🗑 Supprimer cette photo
          </button>
        </div>
      )}

      <button
        onClick={() => { if (photoActive) { setPhotoActive(null); } else { onClose(); } }}
        style={{
          position: "fixed", bottom: "max(90px, env(safe-area-inset-bottom, 24px) + 70px)", right: 24,
          background: "#009e60", border: "none", color: "#fff",
          borderRadius: 50, padding: "12px 20px", fontSize: 14,
          cursor: "pointer", fontFamily: "inherit", fontWeight: "bold",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)", zIndex: 10001,
        }}
            >← Retour</button>
      {/* Fenêtre de confirmation personnalisée (sans mention d'URL) */}
      {photoASupprimer && !demandeMotDePasse && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ ...cardStyle, maxWidth: 340, width: "100%", textAlign: "center" }}>
            <p style={{ fontSize: 15, marginBottom: 20 }}>Supprimer définitivement cette photo ?</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={annulerSuppression} style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={confirmerSuppression} style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", background: "#c0392b", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fenêtre de mot de passe admin personnalisée */}
      {photoASupprimer && demandeMotDePasse && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ ...cardStyle, maxWidth: 340, width: "100%", textAlign: "center" }}>
            <p style={{ fontSize: 14, marginBottom: 12 }}>Mot de passe administrateur requis :</p>
            <input
              type="password"
              value={motDePasseSaisi}
              onChange={(e) => setMotDePasseSaisi(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") validerMotDePasse(); }}
              autoFocus
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.3)", color: "#fff", marginBottom: 12, boxSizing: "border-box", textAlign: "center" }}
            />
            {erreurMotDePasse && <div style={{ color: "#ff8080", fontSize: 12, marginBottom: 12 }}>{erreurMotDePasse}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={annulerSuppression} style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer" }}>
                Annuler
              </button>
              <button onClick={validerMotDePasse} style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", background: "#c0392b", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
