import React, { useState } from "react";
import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";
import quizQuestions from "./quizQuestions";

const COLORS_OR = "#fcd116";

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Mélange les options d'une question et ajuste l'index de la bonne réponse
function shuffleQuestion(q) {
  const optionsWithIndex = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }));
  const shuffled = shuffle(optionsWithIndex);
  return {
    ...q,
    options: shuffled.map((o) => o.opt),
    correct: shuffled.findIndex((o) => o.isCorrect),
  };
}

const NIVEAUX = [
  { id: "facile", label: "🟢 Facile", desc: "Pour débuter en douceur" },
  { id: "moyen", label: "🟡 Moyen", desc: "Un bon défi" },
  { id: "difficile", label: "🔴 Difficile", desc: "Pour les experts" },
];

export default function Quiz({ onClose }) {
  const [step, setStep] = useState("intro"); // intro | playing | result | leaderboard
  const [pseudo, setPseudo] = useState("");
  const [niveau, setNiveau] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [saving, setSaving] = useState(false);

  const startQuiz = () => {
    if (!pseudo.trim() || !niveau) return;
    const filtered = quizQuestions.filter((q) => q.difficulte === niveau);
    const shuffled = shuffle(filtered).slice(0, 10).map(shuffleQuestion);
    setQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setStep("playing");
  };

  const answer = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === questions[current].correct;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        finishQuiz(newScore);
      }
    }, 1000);
  };

  const finishQuiz = async (finalScore) => {
    setStep("result");
    setSaving(true);
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
    try {
      const q = query(collection(db, "quizScores"), orderBy("score", "desc"), limit(10));
      const snap = await getDocs(q);
      setLeaderboard(snap.docs.map((d) => d.data()));
    } catch (e) {
      console.error("Erreur chargement classement:", e);
    }
  };

  const
