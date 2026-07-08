import React, { useState, useRef } from "react";

const COLORS_OR = "#fcd116";

// Contexte envoyé à l'IA pour qu'elle réponde avec des infos précises sur l'événement
const CONTEXTE_EVENEMENT = `
Événement : Fête de la Libération, 30 Août 2026, à Makokou, province de l'Ogooué-Ivindo, Gabon.
Programme : 07h00 Lever du drapeau (Place de l'Indépendance), 08h30 Défilé militaire & civil (Avenue Principale, Makokou), 10h00 Discours des autorités (Préfecture de l'Ogooué-Ivindo), 12h00 Repas communautaire (Esplanade centrale), 15h00 Spectacles culturels & danses traditionnelles (Stade municipal), 19h00 Concert & feux d'artifice (Berges de l'Ivindo).
Entrée gratuite et ouverte à tous.
L'app propose aussi : une liste d'hôtels et restaurants à Makokou, un quiz sur la province, un lecteur du live YouTube de l'événement.
`;

export default function VoiceAssistant({ onClose }) {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | listening | thinking | speaking
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [debugVoices, setDebugVoices] = useState([]);
  const recognitionRef = useRef(null);

  React.useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setDebugVoices(voices.map((v) => `${v.name} (${v.lang})`));
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const cardStyle = {
    background: "linear-gradient(135deg, rgba(0,158,96,0.12), rgba(252,209,22,0.06))",
    border: `2px solid ${COLORS_OR}`,
    borderRadius: 16,
    padding: 24,
    color: "#fff",
  };

  const getFrenchVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "fr-FR") ||
    voices.find((v) => v.lang.startsWith("fr")) ||
    null
  );
};

const speak = (text) => {
  setStatus("speaking");
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 0.95;
  const frenchVoice = getFrenchVoice();
  if (frenchVoice) utterance.voice = frenchVoice;
  utterance.onend = () => setStatus("idle");
  window.speechSynthesis.speak(utterance);
};

  const askAssistant = async (question) => {
    setStatus("thinking");
    setError("");
    setAnswer("");
    try {
      const res = await fetch("/.netlify/functions/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, context: CONTEXTE_EVENEMENT }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Erreur");
      setAnswer(data.answer);
      speak(data.answer);
    } catch (e) {
      console.error(e);
      setError("Désolé, je n'ai pas pu répondre. Réessaie dans un instant.");
      setStatus("idle");
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("La reconnaissance vocale n'est pas supportée sur ce navigateur.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setStatus("listening");
      setTranscript("");
      setAnswer("");
      setError("");
    };
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      askAssistant(text);
    };
    recognition.onerror = () => {
      setListening(false);
      setStatus("idle");
      setError("Je n'ai pas bien entendu, réessaie.");
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ ...cardStyle, maxWidth: 420, width: "100%", maxHeight: "85vh", overflowY: "auto", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ color: COLORS_OR, margin: 0, fontSize: 20 }}>🎙️ Assistant Fête de la Libération</h2>
          <span onClick={onClose} style={{ cursor: "pointer", fontSize: 22 }}>✕</span>
        </div>

        <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 24 }}>
          Pose ta question à voix haute : programme, hôtels, restaurants, la province...
        </p>

        <div
          onClick={status === "idle" ? startListening : undefined}
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: listening ? "rgba(200,0,0,0.5)" : COLORS_OR,
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            cursor: status === "idle" ? "pointer" : "default",
            boxShadow: listening ? "0 0 0 8px rgba(200,0,0,0.2)" : "none",
            transition: "all 0.2s",
          }}
        >
          🎙️
        </div>

        <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 16, minHeight: 20 }}>
          {status === "idle" && "Touche le micro pour parler"}
          {status === "listening" && "Je t'écoute..."}
          {status === "thinking" && "Je réfléchis..."}
          {status === "speaking" && "..."}
        </div>

        {transcript && (
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14, fontStyle: "italic" }}>
            « {transcript} »
          </div>
        )}

        {answer && (
          <div style={{ background: "rgba(0,158,96,0.15)", border: `1px solid ${COLORS_OR}`, borderRadius: 8, padding: 14, fontSize: 14, textAlign: "left" }}>
            {answer}
          </div>
        )}

{error && (
          <div style={{ color: "#ff8080", fontSize: 13, marginTop: 8 }}>{error}</div>
        )}
      </div>
    </div>
  );
}
