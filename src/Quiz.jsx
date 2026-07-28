import React, { useState, useRef, useEffect } from "react";
import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";
import quizQuestions from "./quizQuestions";

const COLORS_OR = "#fcd116";
const VOLUME_MUSIQUE = 0.07;
const VOLUME_MUSIQUE_BAISSE = 0.02;

const REACTIONS_CORRECT = [
  "Bravo, exact !",
  "Impressionnant, tu connais bien la région !",
  "Excellent, continue comme ça !",
  "Voilà qui est juste, bien joué !",
  "Parfait, tu assures !",
];

const REACTIONS_INCORRECT = [
  "Aïe, ce n'était pas ça.",
  "Presque, mais pas tout à fait.",
  "Oh là là, on va réviser un peu la géographie.",
  "Ce n'est pas grave, la prochaine sera la bonne.",
  "Raté, mais courage, ça repart !",
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleQuestion(q) {
  const optionsWithIndex = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }));
  const shuffled = shuffle(optionsWithIndex);
  return {
    ...q,
    options: shuffled.map((o) => o.opt),
    correct: shuffled.findIndex((o) => o.isCorrect),
  };
}

function tirerAuSort(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}

const NIVEAUX = [
  { id: "facile", label: "🟢 Facile", desc: "Pour débuter en douceur" },
  { id: "moyen", label: "🟡 Moyen", desc: "Un bon défi" },
  { id: "difficile", label: "🔴 Difficile", desc: "Pour les experts" },
];

export default function Quiz({ onClose }) {
  const [step, setStep] = useState("intro");
  const [pseudo, setPseudo] = useState("");
  const [niveau, setNiveau] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [saving, setSaving] = useState(false);

  const audioRef = useRef(null);

  const getFrenchVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((v) => v.lang === "fr-FR") ||
      voices.find((v) => v.lang.startsWith("fr")) ||
      null
    );
  };

  const parler = (texte, callback) => {
    if (audioRef.current) audioRef.current.volume = VOLUME_MUSIQUE_BAISSE;
    const utterance = new SpeechSynthesisUtterance(texte);
    utterance.lang = "fr-FR";
    utterance.rate = 1;
    const voix = getFrenchVoice();
    if (voix) utterance.voice = voix;
    utterance.onend = () => {
      if (audioRef.current) audioRef.current.volume = VOLUME_MUSIQUE;
      if (callback) callback();
    };
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  useEffect(() => {
    if (step === "playing" && questions.length > 0) {
      parler(questions[current].question);
    }
  
  }, [current, step]);

  const startQuiz = () => {
    if (!pseudo.trim() || !niveau) return;
    const filtered = quizQuestions.filter((q) => q.difficulte === niveau);
    const shuffled = shuffle(filtered).slice(0, 10).map(shuffleQuestion);
    setQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setStep("playing");
    if (audioRef.current) {
      audioRef.current.volume = VOLUME_MUSIQUE;
      audioRef.current.play().catch(() => {});
    }
  };

  const answer = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === questions[current].correct;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    const reaction = tirerAuSort(isCorrect ? REACTIONS_CORRECT : REACTIONS_INCORRECT);
    const explication = questions[current].explication || "";
    parler(`${reaction} ${explication}`, () => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        finishQuiz(newScore);
      }
    });
  };
  const commentaireFinal = (finalScore, total) => {
    const pct = finalScore / total;
    if (pct >= 0.8) return `Score final : ${finalScore} sur ${total} ! Chapeau, tu es un vrai connaisseur de l'Ogooué-Ivindo !`;
    if (pct >= 0.4) return `Score final : ${finalScore} sur ${total}. Pas mal du tout, tu peux encore progresser !`;
    return `Score final : ${finalScore} sur ${total}. Alors là, il va falloir réviser un peu avant de revenir !`;
  };

  const finishQuiz = async (finalScore) => {
    setStep("result");
    setSaving(true);
    parler(commentaireFinal(finalScore, questions.length));
    if (audioRef.current) {
      audioRef.current.pause();
    }
    try {
      await addDoc(collection(db, "quizScores"), {
        pseudo: pseudo.trim(),
        score: finalScore,
        total: questions.length,
        niveau,
        date: serverTimestamp(),
      });
    } catch (e) {
      console.error("Erreur sauvegarde score:", e);
    }
    setSaving(false);
  };

  const loadLeaderboard = async () => {
    setStep("leaderboard");
    if (audioRef.current) audioRef.current.pause();
    try {
      const q = query(collection(db, "quizScores"), orderBy("score", "desc"), limit(10));
      const snap = await getDocs(q);
      setLeaderboard(snap.docs.map((d) => d.data()));
    } catch (e) {
      console.error("Erreur chargement classement:", e);
    }
  };

  const retourIntro = () => {
    setStep("intro");
    setNiveau(null);
    if (audioRef.current) audioRef.current.pause();
  };

  const fermer = () => {
    window.speechSynthesis.cancel();
    if (audioRef.current) audioRef.current.pause();
    onClose();
  };

  const cardStyle = {
    background: "linear-gradient(135deg, rgba(0,158,96,0.12), rgba(252,209,22,0.06))",
    border: `2px solid ${COLORS_OR}`,
    borderRadius: 16,
    padding: 24,
    color: "#fff",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <audio ref={audioRef} src="/Youba.mp3" loop preload="auto" />

      <div style={{ ...cardStyle, maxWidth: 420, width: "100%", maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ color: COLORS_OR, margin: 0, fontSize: 20 }}>🎯 Quiz Ogooué-Ivindo</h2>
          <span onClick={fermer} style={{ cursor: "pointer", fontSize: 22 }}>✕</span>
        </div>

        {step === "intro" && (
          <div>
            <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 12 }}>
              10 questions sur la province de l'Ogooué-Ivindo. Entre ton pseudo et choisis un niveau !
            </p>
            <input
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              placeholder="Ton pseudo"
              style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.3)", color: "#fff", marginBottom: 16, boxSizing: "border-box" }}
            />
            <div style={{ marginBottom: 16 }}>
              {NIVEAUX.map((n) => (
                <div
                  key={n.id}
                  onClick={() => setNiveau(n.id)}
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 8,
                    border: niveau === n.id ? `2px solid ${COLORS_OR}` : "1px solid rgba(255,255,255,0.2)",
                    background: niveau === n.id ? "rgba(252,209,22,0.15)" : "rgba(255,255,255,0.05)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{n.label}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>{n.desc}</div>
                </div>
              ))}
            </div>
            <button
              onClick={startQuiz}
              disabled={!pseudo.trim() || !niveau}
              style={{ width: "100%", padding: 14, borderRadius: 8, border: "none", background: COLORS_OR, color: "#1a2e1a", fontWeight: "bold", fontSize: 16, cursor: "pointer", opacity: pseudo.trim() && niveau ? 1 : 0.5 }}
            >
              Commencer le quiz
            </button>
            <button
              onClick={loadLeaderboard}
              style={{ width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${COLORS_OR}`, background: "transparent", color: COLORS_OR, marginTop: 10, cursor: "pointer" }}
            >
              🏆 Voir le classement
            </button>
          </div>
        )}

        {step === "playing" && questions.length > 0 && (
          <div>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
              Question {current + 1}/{questions.length} — {questions[current].theme}
            </div>
            <h3 style={{ fontSize: 17, marginBottom: 16 }}>{questions[current].question}</h3>
            {questions[current].options.map((opt, i) => {
              let bg = "rgba(255,255,255,0.08)";
              if (selected !== null) {
                if (i === questions[current].correct) bg = "rgba(0,200,0,0.4)";
                else if (i === selected) bg = "rgba(200,0,0,0.4)";
              }
              return (
                <div
                  key={i}
                  onClick={() => answer(i)}
                  style={{ padding: 12, borderRadius: 8, marginBottom: 8, background: bg, cursor: selected === null ? "pointer" : "default", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  {opt}
                </div>
              );
            })}
          </div>
        )}

        {step === "result" && (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 40, marginBottom: 8 }}>🎉</p>
            <h3 style={{ color: COLORS_OR }}>Score final : {score}/{questions.length}</h3>
            {saving && <p style={{ fontSize: 12, opacity: 0.6 }}>Enregistrement en cours...</p>}
            <button onClick={loadLeaderboard} style={{ width: "100%", padding: 12, borderRadius: 8, border: `1px solid ${COLORS_OR}`, background: "transparent", color: COLORS_OR, marginTop: 16, cursor: "pointer" }}>
              🏆 Voir le classement
            </button>
            <button onClick={retourIntro} style={{ width: "100%", padding: 12, borderRadius: 8, border: "none", background: COLORS_OR, color: "#1a2e1a", fontWeight: "bold", marginTop: 10, cursor: "pointer" }}>
              Rejouer
            </button>
          </div>
        )}

        {step === "leaderboard" && (
          <div>
            <h3 style={{ color: COLORS_OR, marginBottom: 12 }}>🏆 Meilleurs joueurs</h3>
            {leaderboard.length === 0 && <p style={{ opacity: 0.6 }}>Chargement...</p>}
            {leaderboard.map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <span>{i + 1}. {p.pseudo}</span>
                <span style={{ color: COLORS_OR, fontWeight: "bold" }}>{p.score}/{p.total}</span>
              </div>
            ))}
            <button onClick={retourIntro} style={{ width: "100%", padding: 12, borderRadius: 8, border: "none", background: COLORS_OR, color: "#1a2e1a", fontWeight: "bold", marginTop: 16, cursor: "pointer" }}>
              Retour
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
