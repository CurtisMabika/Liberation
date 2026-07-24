import { useState, useEffect } from "react";
import Quiz from "./Quiz";
import VoiceAssistant from "./VoiceAssistant"; 
import GalerieCollaborative from "./GalerieCollaborative"; 
import IntroVideo from "./IntroVideo";
import GalerieRealisations from "./GalerieRealisations";
const TARGET_DATE = new Date("2026-08-30T00:00:00");

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = target - new Date();
      if (diff <= 0) return setTimeLeft({ jours: 0, heures: 0, minutes: 0, secondes: 0 });
      setTimeLeft({
        jours: Math.floor(diff / 86400000),
        heures: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        secondes: Math.floor((diff % 60000) / 1000), 
      });
    };
    calc(); 
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

const programmes = [
  { heure: "07h00", titre: "Lever du drapeau", lieu: "Place de l'Indépendance", icon: "🏴" },
  { heure: "08h30", titre: "Défilé militaire & civil", lieu: "Avenue Principale, Makokou", icon: "🪖" },
  { heure: "10h00", titre: "Discours des autorités", lieu: "Préfecture de l'Ogooué-Ivindo", icon: "🎙️" },
  { heure: "12h00", titre: "Repas communautaire", lieu: "Esplanade centrale", icon: "🍽️" },
  { heure: "15h00", titre: "Spectacles culturels & danses traditionnelles", lieu: "Stade municipal", icon: "💃" },
  { heure: "19h00", titre: "Concert & feux d'artifice", lieu: "Berges de l'Ivindo", icon: "🎆" },
];

const hotels = [
  { nom: "Hôtel Belinga", tel: "066 07 46 00", note: "⭐⭐⭐⭐⭐ Top", couleur: "#009e60" },
  { nom: "Hôtel VIP", tel: "066 56 96 98", note: "⭐⭐⭐⭐ Bien", couleur: "#fcd116" },
  { nom: "Hôtel Arizona", tel: "062 41 87 33", note: "⭐⭐⭐⭐ Bien", couleur: "#fcd116" },
  { nom: "Wamy Hôtel", tel: "062 25 32 22", note: "⭐⭐⭐⭐ Bien", couleur: "#fcd116" },
  { nom: "Hôtel de la Mairie", tel: "065 72 37 04", note: "⭐⭐⭐ Passable", couleur: "#c8960c" },
  { nom: "Hôtel le Bordelais", tel: "066 43 26 50", note: "⭐⭐⭐ Passable", couleur: "#c8960c" },
  { nom: "Hôtel de l'Assemblée Départementale", tel: null, note: "⭐⭐⭐ Passable", couleur: "#c8960c" },
  { nom: "Motel des Voyageurs", tel: "077 10 20 21", note: "⭐⭐ Faible", couleur: "#ff6b35" },
  { nom: "Starlyn Hotel", tel: null, note: "⭐ Très Faible", couleur: "#cc3333" },
];

const restaurants = [
  { nom: "Restaurant de l'Hôtel Belinga", tel: "066 07 46 00", note: "⭐⭐⭐⭐⭐ Très bien", couleur: "#009e60" },
  { nom: "Étoile de Makokou", tel: "077 87 69 27", note: "⭐⭐⭐⭐⭐ Très bien", couleur: "#009e60" },
  { nom: "Plaine Sud (en face du stade)", tel: "076 20 35 06", note: "⭐⭐⭐⭐⭐ Très bien", couleur: "#009e60" },
  { nom: "Plaine Sud Ebandangoye", tel: "077 15 63 22", note: "⭐⭐⭐⭐⭐ Très bien", couleur: "#009e60" },
  { nom: "Restaurant de l'Hôtel Wamy", tel: "062 25 32 22", note: "⭐⭐⭐⭐ Bien", couleur: "#fcd116" },
  { nom: "Chez Natacha", tel: "066 63 30 81", note: "⭐⭐⭐⭐ Bien", couleur: "#fcd116" },
  { nom: "Le Progrès chez Georgette Tankam", tel: "077 43 95 79", note: "⭐⭐⭐⭐ Bien", couleur: "#fcd116" },
];
const numerosUtiles = [
  {
    categorie: "🚨 Urgences",
    items: [
      { nom: "SAMU social", tel: "074094866" }, 
      { nom: "Gendarmerie", tel: "066629049" },
      { nom: "Sapeurs pompiers", tel: "011903640 / 077937841" },
    ],
  },
  {
    categorie: "🏥 Santé",
    items: [
      { nom: "Pharmacie", tel: "066238914 / 077427330" },
    ],
  },
  {
    categorie: "⚖️ Administration",
    items: [
      { nom: "Prison centrale", tel: "065210693" },
    ],
  },
  {
    categorie: "🕊️ Funérailles",
    items: [
      { nom: "Pompes funèbres", tel: "077688413" },
    ],
  },
  {
    categorie: "✈️ Agences de voyage & Transport",
    items: [
      { nom: "Razac 6 Transport", tel: "+241 (06) 2164109 / +241 (07) 4537710" },
      { nom: "Méroé Transport", tel: "+241 0130505" },
    ],
  },
];

const galerie = [
  { src: "/photo1.jpeg", legende: "Centre de Formation Professionnelle à Ebandangoye" },
  { src: "/photo2.jpeg", legende: "CNSS Makokou" },
  { src: "/photo3.jpeg", legende: "Préfecture en construction" },
  { src: "/photo4.jpeg", legende: "Logements de sapeurs pompiers" },
  { src: "/photo5.jpeg", legende: "Nouveau marché à Makokou" },
];
const bioPresidente = `Huguette Nyana Ekoume épouse Awori Onanga est la présidente du comité d'organisation du 30 août 2026 dans la province de l'Ogooué-Ivindo. Élue sénatrice à Makokou, elle est depuis le 17 décembre 2025, la première présidente du Sénat de la 5ème République au Gabon.

Formation
Huguette Nyana Ekoume effectue ses études secondaires au lycée national Léon-Mba de Libreville. Elle poursuit ensuite des études supérieures en droit public à l'Université de Lomé, au Togo. Elle est également diplômée de l'École nationale d'administration (ENA) du Gabon.

Carrière administrative
Huguette Nyana Ekoume exerce plusieurs fonctions au sein de l'administration gabonaise. Elle occupe notamment les postes de : conseillère à la Primature ; conseillère technique au ministère du Budget ; directrice des prestations familiales à la Caisse de prévoyance et de prestations familiales ; secrétaire générale du ministère de l'Économie et des Participations ; directrice générale de l'Agence judiciaire de l'État entre 2017 et 2023.

Présidence du Sénat
Le 17 décembre 2025, Huguette Nyana Ekoume est élue présidente du Sénat du Gabon avec 66 voix sur 68 lors de la session inaugurale de la chambre haute sous la transition politique gabonaise. Dans ses premières déclarations publiques, elle indique vouloir orienter l'action du Sénat vers les questions de décentralisation, de représentation des collectivités territoriales et d'évaluation des politiques publiques.

Enseignante vacataire à l'École préparatoire aux carrières administratives (EPCA), membre de la Commission d'arbitrage de la Chambre de commerce international, c'est une femme accomplie, rigoureuse, patriote convaincue, passionnée de travail et soucieuse du bien-être de ses concitoyens et de la défense de l'intérêt général.Elle est par ailleurs la quatrième femme à occuper la présidence du Sénat au Gabon, après Rose Francine Rogombe, Lucie Milebou Aubusson-Mboussou et Paulette Missambo.`;

const bioPresident = `Le Président de la République, un acteur de la reconstruction nationale

Depuis son accession à la magistrature suprême, le Président de la République, Brice Clotaire Oligui Nguema, inscrit son action dans une dynamique de reconstruction et de transformation du Gabon. Son ambition affichée est de bâtir un État plus moderne, plus efficace et davantage tourné vers les aspirations des populations.

Son mandat est marqué par une volonté de renforcer les infrastructures nationales, de moderniser les services publics et d'améliorer les conditions de vie des citoyens. Routes, établissements scolaires, structures sanitaires, logements, équipements publics et projets de développement local figurent parmi les domaines dans lesquels les pouvoirs publics ont engagé ou annoncé d'importants investissements.

Cette vision repose également sur la valorisation du potentiel économique du pays, la promotion de l'entrepreneuriat, la diversification de l'économie et la création d'opportunités pour la jeunesse. Les réformes institutionnelles engagées depuis 2023 s'inscrivent dans cette volonté de consolider les fondements de l'État et d'accompagner le développement national.

À travers les nombreux chantiers engagés sur l'ensemble du territoire, les autorités présentent leur action comme celle d'un Gabon en pleine mutation, où le développement des infrastructures est considéré comme un levier essentiel de croissance, d'intégration territoriale et d'amélioration du bien-être des populations.

L'histoire retiendra que cette période a été marquée par une importante dynamique de transformation, dont les effets continueront d'être appréciés au fil du temps par les générations futures.`;
const COLORS = {
  vert: "#009e60",
  jaune: "#fcd116",
  bleu: "#003082",
  or: "#c8960c",
};
const PageListe = ({ title, subtitle, items, onClose }) => (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 40%, #0a1520 100%)",
      overflowY: "auto", padding: "24px", paddingBottom: "100px",
    }}>
      <h2 style={{ fontSize: 26, color: COLORS.jaune, marginBottom: 8, fontWeight: "bold" }}>{title}</h2>
      <p style={{ color: "rgba(240,234,214,0.55)", marginBottom: 24, fontSize: 14 }}>{subtitle}</p>
      {items.map((h, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 16px", marginBottom: 10,
          background: "rgba(0,0,0,0.3)",
          borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)",
          flexWrap: "wrap", gap: 6,
        }}>
          <div>
            <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{h.nom}</div>
            {h.tel && <div style={{ color: "rgba(240,234,214,0.5)", fontSize: 12, marginTop: 4 }}>📞 {h.tel}</div>}
          </div>
          <span style={{
            background: "rgba(0,0,0,0.3)", border: `1px solid ${h.couleur}`,
            color: h.couleur, borderRadius: 20, padding: "3px 10px", fontSize: 11,
          }}>{h.note}</span>
        </div>
      ))}
      <button onClick={onClose} style={{
        position: "fixed", bottom: 24, right: 24,
        background: COLORS.vert, border: "none", color: "#fff",
        borderRadius: 50, padding: "12px 20px", fontSize: 14,
        cursor: "pointer", fontFamily: "inherit", fontWeight: "bold",
        boxShadow: "0 4px 15px rgba(0,0,0,0.4)", zIndex: 100,
      }}>← Retour</button>
    </div>
  );
export default function App() {
  const countdown = useCountdown(TARGET_DATE);
  const [activeTab, setActiveTab] = useState("accueil");
  const [showHotels, setShowHotels] = useState(false);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showGalerie, setShowGalerie] = useState(false);
  const [showNumeros, setShowNumeros] = useState(false);
  const [photoActive, setPhotoActive] = useState(null);
  const [visible, setVisible] = useState(false);
const [showQuiz, setShowQuiz] = useState(false);
const [showAssistant, setShowAssistant] = useState(false);
const [showGalerieCollab, setShowGalerieCollab] = useState(false);
  const [showBioPresidente, setShowBioPresidente] = useState(false);
  const [showBioPresident, setShowBioPresident] = useState(false);
const [showIntro, setShowIntro] = useState(true);

  const [meteo, setMeteo] = useState(null);

useEffect(() => {
  fetch("https://api.open-meteo.com/v1/forecast?latitude=0.5738&longitude=12.8642&daily=temperature_2m_max,precipitation_probability_max&current=temperature_2m,weathercode&timezone=Africa/Libreville")
    .then(res => res.json())
    .then(data => setMeteo(data))
    .catch(err => console.error("Erreur météo:", err));
}, []);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

const meteoAujourdhui = meteo?.daily ? {
  label: "Météo à Makokou aujourd'hui",
  valeur: `${Math.round(meteo.daily.temperature_2m_max[0])}°C`,
  icon: meteo.daily.precipitation_probability_max[0] > 50 ? "🌧️" : "☀️",
} : { label: "Météo aujourd'hui", valeur: "Chargement...", icon: "🌤️" };

const meteoDemain = meteo?.daily ? {
  label: "Météo à Makokou demain",
  valeur: `${Math.round(meteo.daily.temperature_2m_max[1])}°C`,
  icon: meteo.daily.precipitation_probability_max[1] > 50 ? "🌧️" : "☀️",
} : { label: "Météo demain", valeur: "Chargement...", icon: "🌤️" };

const infos = [
  meteoAujourdhui,
  meteoDemain,];          

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 40%, #0a1520 100%)",
      fontFamily: "'Georgia', serif",
      color: "#f0ead6",
      overflowX: "hidden",
    }}>
      {showIntro && <IntroVideo onFinish={() => setShowIntro(false)} />}
      {showHotels && <PageListe title="🏨 Hébergement" subtitle="Hôtels disponibles à Makokou — Réservez à l'avance !" items={hotels} onClose={() => setShowHotels(false)} />}
      {showRestaurants && <PageListe title="🍽️ Restaurants" subtitle="Restaurants disponibles à Makokou" items={restaurants} onClose={() => setShowRestaurants(false)} />} 
{showNumeros && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 40%, #0a1520 100%)",
          overflowY: "auto", padding: "24px",
        }}>
          <h2 style={{ fontSize: 26, color: COLORS.jaune, marginBottom: 8, fontWeight: "bold" }}>📞 Numéros utiles</h2>
          <p style={{ color: "rgba(240,234,214,0.55)", marginBottom: 24, fontSize: 14 }}>Contacts pratiques à Makokou</p>
          {numerosUtiles.map((groupe, gi) => (
            <div key={gi} style={{ marginBottom: 24 }}>
              <h3 style={{ color: COLORS.vert, fontSize: 16, marginBottom: 10, fontWeight: "bold" }}>{groupe.categorie}</h3>
              {groupe.items.map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 16px", marginBottom: 10,
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)",
                  flexWrap: "wrap", gap: 6,
                }}>
                  <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{item.nom}</div>
                  <span style={{ color: COLORS.jaune, fontSize: 14 }}>📞 {item.tel}</span>
                </div>
              ))}
            </div>
          ))}
          <button onClick={() => setShowNumeros(false)} style={{
            position: "fixed", bottom: 24, right: 24,
            background: COLORS.vert, border: "none", color: "#fff",
            borderRadius: 50, padding: "12px 20px", fontSize: 14,
            cursor: "pointer", fontFamily: "inherit", fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(0,0,0,0.4)", zIndex: 100,
          }}>← Retour</button>
        </div>
      )}

      {showGalerie && <GalerieRealisations onClose={() => setShowGalerie(false)} />}
      {photoActive !== null && (
        <div onClick={() => setPhotoActive(null)} style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.95)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: 24, cursor: "pointer",
        }}>
          <img src={galerie[photoActive].src} alt={galerie[photoActive].legende} style={{
            maxWidth: "100%", maxHeight: "75vh",
            borderRadius: 10, objectFit: "contain",
          }} />
          <p style={{ color: "#fff", marginTop: 16, fontSize: 15, textAlign: "center" }}>
            {galerie[photoActive].legende}
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 8 }}>
            Appuyer pour fermer
          </p>
        </div>
      )}

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(circle at 20% 20%, rgba(0,158,96,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(252,209,22,0.06) 0%, transparent 50%)",
      }} />

      <header style={{
        position: "relative", zIndex: 10,
        borderBottom: `3px solid ${COLORS.or}`,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", width: 36, height: 24, borderRadius: 3, overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" }}>
              <div style={{ flex: 1, background: COLORS.vert }} />
              <div style={{ flex: 1, background: COLORS.jaune }} />
              <div style={{ flex: 1, background: COLORS.bleu }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.jaune, letterSpacing: 3, textTransform: "uppercase" }}>République Gabonaise</div>
              <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff", letterSpacing: 1 }}>Fête de la Libération</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "rgba(240,234,214,0.6)", textAlign: "right" }}>
            <div>Makokou • Ogooué-Ivindo</div>
            <div style={{ color: COLORS.jaune }}>30 Août 2026</div>
          </div>
        </div>
        <nav style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 4, paddingBottom: 0 }}>
          {[
            { id: "accueil", label: "Accueil" },
            { id: "infos", label: "Infos pratiques" },
            { id: "programme", label: "Programme" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "8px 20px", border: "none",
              background: activeTab === tab.id ? COLORS.vert : "transparent",
              color: activeTab === tab.id ? "#fff" : "rgba(240,234,214,0.65)",
              borderRadius: "6px 6px 0 0", cursor: "pointer", fontSize: 14,
              fontFamily: "inherit", fontWeight: activeTab === tab.id ? "bold" : "normal",
              transition: "all 0.2s", letterSpacing: 0.5,
            }}>{tab.label}</button>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 20 }}>
        {activeTab === "accueil" && (
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
 {/* Compte à rebours */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 13, color: COLORS.jaune, letterSpacing: 3, textTransform: "uppercase" }}>
                  ⏳ Compte à rebours
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {Object.entries(countdown).map(([unit, val]) => (
                  <div key={unit} style={{
                    background: "rgba(0,0,0,0.4)", border: "1px solid rgba(200,150,12,0.3)",
                    borderRadius: 14, padding: "20px 8px", textAlign: "center",
                  }}>
                    <div style={{
                      fontSize: "clamp(28px, 6vw, 48px)", fontWeight: "bold",
                      color: COLORS.jaune, lineHeight: 1, fontVariantNumeric: "tabular-nums",
                    }}>{String(val).padStart(2, "0")}</div>
                    <div style={{ fontSize: 11, color: "rgba(240,234,214,0.5)", textTransform: "uppercase", letterSpacing: 2, marginTop: 6 }}>
                      {unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          {/* Rangée haut : Réalisations | Président */}
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>

              {/* Bouton Réalisations */}
              <div onClick={() => setShowGalerie(true)} style={{
                flex: 1, aspectRatio: "1 / 1", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "flex-end",
                cursor: "pointer", position: "relative",
                background: "linear-gradient(135deg, rgba(0,158,96,0.2), rgba(0,0,0,0.4))",
                border: `2px solid ${COLORS.or}`,
                borderRadius: 16, overflow: "hidden",
              }}>
                <img src="/realisations.jpeg" alt="Réalisations du Président" style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                }} />
                <span style={{
                  position: "relative", zIndex: 1,
                  fontSize: 13, color: "#fff",
                  textAlign: "center", fontWeight: "bold", lineHeight: 1.4,
                  padding: "10px 8px",
                  width: "100%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                }}>
                  Réalisations du Président à Makokou
                </span>
              </div>
              {/* Photo Président */}
              <div onClick={() => setShowBioPresident(true)} style={{
                flex: 1, aspectRatio: "1 / 1", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "flex-end",
                cursor: "pointer", position: "relative",
                background: "linear-gradient(135deg, rgba(200,150,12,0.15), rgba(0,0,0,0.4))",
                border: `2px solid ${COLORS.or}`,
                borderRadius: 16, overflow: "hidden",
              }}>
                <span style={{
                  position: "relative", zIndex: 1,
                  fontSize: 13, color: "#fff",
                  fontWeight: "bold", textAlign: "center",
                  padding: "10px 8px",
                  width: "100%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                }}>
                Le Président de la République
                </span>
              </div>
            </div>

            {/* Assistant vocal */}
            <div
              onClick={() => setShowAssistant(true)}
              style={{
                marginBottom: 16,
                background: "linear-gradient(135deg, rgba(0,158,96,0.2), rgba(252,209,22,0.1))",
                border: `2px solid ${COLORS.or}`,
                borderRadius: 16,
                padding: "18px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 28 }}>🎙️</span>
              <div>
                <div style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>Assistant vocal</div>
                <div style={{ fontSize: 12, color: "rgba(240,234,214,0.7)" }}>appuie sur le bouton jaune et pose ta question à voix haute !</div>
              </div>
            </div>

            {/* Rangée : Présidente du comité | Bloc 2 */}
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>

              {/* Présidente du comité d'organisation */}
              <div onClick={() => setShowBioPresidente(true)} style={{
                flex: 1, aspectRatio: "1 / 1", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "flex-end",
                cursor: "pointer", position: "relative",
                background: "linear-gradient(135deg, rgba(0,158,96,0.2), rgba(0,0,0,0.4))",
                border: `2px solid ${COLORS.or}`,
                borderRadius: 16, overflow: "hidden",
              }}>
                <img src="/huguette-nyana-ekoume.jpg" alt="Présidente du comité d'organisation" style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                }} />
                <span style={{
                  position: "relative", zIndex: 1,
                  fontSize: 13, color: "#fff",
                  textAlign: "center", fontWeight: "bold", lineHeight: 1.4,
                  padding: "10px 8px",
                  width: "100%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                }}>
                  Présidente du Comité d'Organisation
                </span>
              </div>

              {/* Bloc 2 - à compléter */}
              <div style={{
                flex: 1, aspectRatio: "1 / 1",
                background: "linear-gradient(135deg, rgba(200,150,12,0.15), rgba(0,0,0,0.4))",
                border: `2px solid ${COLORS.or}`,
                borderRadius: 16,
              }} />
            </div>

            {/* Météo */}
            <div style={{
              marginBottom: 14,
              background: "linear-gradient(135deg, rgba(0,158,96,0.2), rgba(252,209,22,0.1))",
              border: `2px solid ${COLORS.or}`,
              borderRadius: 16,
              padding: "18px 16px",
            }}>
              <div style={{ fontSize: 16, color: "#fff", fontWeight: "bold", textAlign: "center", marginBottom: 14 }}>
                🌤️ Météo à Makokou
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{meteoAujourdhui.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(240,234,214,0.6)", textTransform: "uppercase", letterSpacing: 1 }}>Aujourd'hui</div>
                    <div style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>{meteoAujourdhui.valeur}</div>
                  </div>
                </div>
                <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{meteoDemain.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(240,234,214,0.6)", textTransform: "uppercase", letterSpacing: 1 }}>Demain</div>
                    <div style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>{meteoDemain.valeur}</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setShowQuiz(true)}
              style={{
                marginTop: 16,
                background: "linear-gradient(135deg, rgba(0,158,96,0.2), rgba(252,209,22,0.1))",
                border: `2px solid ${COLORS.or}`,
                borderRadius: 16,
                padding: "18px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 28 }}>🎯</span>
              <div>
                <div style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>Quiz : Connais-tu l'Ogooué-Ivindo ?</div>
                <div style={{ fontSize: 12, color: "rgba(240,234,214,0.7)" }}>Teste tes connaissances et grimpe au classement !</div>
              </div>
            </div>

            <div
              onClick={() => setShowGalerieCollab(true)}
              style={{
                marginTop: 12,
                background: "linear-gradient(135deg, rgba(0,158,96,0.2), rgba(252,209,22,0.1))",
                border: `2px solid ${COLORS.or}`,
                borderRadius: 16,
                padding: "18px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 28 }}>📷</span>
              <div>
                <div style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>Galerie des visiteurs</div>
                <div style={{ fontSize: 12, color: "rgba(240,234,214,0.7)" }}>Partage tes photos de l'événement !</div>
              </div>
            </div>
          </div>
        )}

        {showBioPresidente && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 60,
            background: "linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 40%, #0a1520 100%)",
            overflowY: "auto", padding: "24px", paddingBottom: "100px",
          }}>
            <img src="/huguette-nyana-ekoume.jpg" alt="Huguette Nyana Ekoume" style={{
              width: 140, height: 140, borderRadius: "50%", objectFit: "cover",
              border: `3px solid ${COLORS.or}`, display: "block", margin: "0 auto 20px",
            }} />
            <h2 style={{ fontSize: 22, color: COLORS.jaune, marginBottom: 20, fontWeight: "bold", textAlign: "center" }}>
              Huguette Nyana Ekoume
            </h2>
            <p style={{ color: "rgba(240,234,214,0.8)", fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {bioPresidente}
            </p>
            <button onClick={() => setShowBioPresidente(false)} style={{
              position: "fixed", bottom: "max(90px, env(safe-area-inset-bottom, 24px) + 70px)", right: 24,
              background: COLORS.vert, border: "none", color: "#fff",
              borderRadius: 50, padding: "12px 20px", fontSize: 14,
              cursor: "pointer", fontFamily: "inherit", fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(0,0,0,0.4)", zIndex: 9999,
            }}>← Retour</button>
          </div>
        )}
{showBioPresident && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 60,
            background: "linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 40%, #0a1520 100%)",
            overflowY: "auto", padding: "24px", paddingBottom: "100px",
          }}>
            <img src="/oligui1.jpg" alt="Président de la République" style={{
              width: 140, height: 140, borderRadius: "50%", objectFit: "cover",
              border: `3px solid ${COLORS.or}`, display: "block", margin: "0 auto 20px",
            }} />
            <p style={{ color: "rgba(240,234,214,0.8)", fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {bioPresident}
            </p>
            <div
              onClick={() => { setShowBioPresident(false); setShowGalerie(true); }}
              style={{
                marginTop: 20,
                background: "linear-gradient(135deg, rgba(0,158,96,0.2), rgba(252,209,22,0.1))",
                border: `2px solid ${COLORS.or}`,
                borderRadius: 14,
                padding: "16px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <span style={{ color: COLORS.jaune, fontWeight: "bold", fontSize: 15 }}>
                📸 Voir les réalisations dans l'Ogooué-Ivindo →
              </span>
            </div>
            <button onClick={() => setShowBioPresident(false)} style={{
              position: "fixed", bottom: "max(90px, env(safe-area-inset-bottom, 24px) + 70px)", right: 24,
              background: COLORS.vert, border: "none", color: "#fff",
              borderRadius: 50, padding: "12px 20px", fontSize: 14,
              cursor: "pointer", fontFamily: "inherit", fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(0,0,0,0.4)", zIndex: 9999,
            }}>← Retour</button>
          </div>
        )}
        {activeTab === "infos" && (
          <div>
            <h2 style={{ fontSize: 26, color: COLORS.jaune, marginBottom: 28, fontWeight: "bold" }}>Infos pratiques</h2>
            <div style={{ display: "grid", gap: 18 }}>
              {[
                { titre: "🌿 Ogooué-Ivindo", contenu: "Découvrir la province →", action: "ogoue" },
                { titre: "🏨 Hébergement", contenu: "Voir la liste des hôtels →", action: "hotels" },
                { titre: "🍽️ Restauration", contenu: "Voir la liste des restaurants →", action: "restaurants" },
                { titre: "📞 Numéros utiles", contenu: "Urgences, santé, transport →", action: "numeros" },
                { titre: "📞 Contact officiel", contenu: "Pour toute information complémentaire, contactez le comité d'organisation, le gouvernorat ou la Mairie de Makokou. Les numéros de téléphone sont disponibles dans la rubrique numéros utiles de cette application.", action: null },
                { titre: "🗺️ Comment venir à Makokou ?", contenu: "Makokou est accessible par la route nationale depuis Libreville (~620 km) ou par avion via l'Aéroport Emmanuel Issoze Ngondet de Makokou. Des transports en commun sont disponibles depuis la gare routière à Libreville. Les contacts des agences de voyage sont diponibles dans la rubrique numéros utiles de cette application", action: null },
              ].map((card, i) => (
                <div key={i} onClick={() => {
                  if (card.action === "hotels") setShowHotels(true);
                  if (card.action === "restaurants") setShowRestaurants(true);
                  if (card.action === "ogoue") setActiveTab("ogoue");
                  if (card.action === "numeros") setShowNumeros(true);
                }} style={{                  background: "rgba(0,0,0,0.35)",
                  border: card.action ? "1px solid rgba(0,158,96,0.35)" : "1px solid rgba(200,150,12,0.2)",
                  borderRadius: 14, padding: "22px 22px",
                  cursor: card.action ? "pointer" : "default",
                }}>
                  <h3 style={{ color: card.action ? COLORS.vert : "#fff", fontSize: 16, margin: "0 0 10px", fontWeight: "bold" }}>{card.titre}</h3>
                  <div style={{ color: "rgba(240,234,214,0.65)", fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                    {card.action ? <span style={{ color: COLORS.jaune }}>{card.contenu}</span> : card.contenu}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "programme" && (
          <div>
            <h2 style={{ fontSize: 26, color: COLORS.jaune, marginBottom: 20, fontWeight: "bold" }}>Programme officiel</h2>

            <div style={{
              background: "linear-gradient(135deg, rgba(0,158,96,0.12), rgba(252,209,22,0.06))",
              border: `2px solid ${COLORS.or}`,
              borderRadius: 16,
              padding: "16px",
              marginBottom: 24,
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "red", display: "inline-block" }} />
                <span style={{ color: COLORS.jaune, fontWeight: "bold", fontSize: 16, letterSpacing: 1 }}>
                  SUIVEZ EN DIRECT
                </span>
              </div>

              <div className="youtube-live-container" style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 12 }}>
                <iframe
                  title="Live YouTube"
                  src="https://www.youtube.com/embed/live_stream?channel=UCi_kcAc-miEhxujzXaxk1pA&autoplay=1&mute=1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>

            <div style={{
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(200,150,12,0.25)",
              borderRadius: 14,
              padding: "24px 22px",
              textAlign: "center",
            }}>
              <p style={{ color: "rgba(240,234,214,0.75)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                📋 Le programme détaillé des festivités n'est pas encore disponible.<br />
                Dès la mi-août, les premières délégations commenceront à converger vers Makokou, marquant le début d'une montée en puissance des préparatifs. Le Président de la République est attendu dans la province pour prendre part aux célébrations. Plusieurs inaugurations d'infrastructures figurent déjà parmi les temps forts annoncés. Grand passionné de sport, le Chef de l'État pourrait également participer à une journée spécialement consacrée aux activités sportives, un rendez-vous qui s'annonce particulièrement attendu par les populations. Autre moment fort pressenti : un méga-concert populaire qui pourrait se tenir à la Place des Fêtes ou au stade Alexandre Samba, afin de clôturer les festivités dans une ambiance de communion et de célébration. Nous ne manquerons pas de vous tenir informés dès la publication du programme officiel.

              </p>
            </div>
          </div>
        )}
{activeTab === "ogoue" && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 40%, #0a1520 100%)",
            overflowY: "auto", padding: "24px",
          }}>
            <h2 style={{ fontSize: 26, color: COLORS.jaune, marginBottom: 8, fontWeight: "bold" }}>Ogooué-Ivindo</h2>
            <p style={{ color: "rgba(240,234,214,0.55)", marginBottom: 28, fontSize: 14 }}>
              Province du Gabon — Présentation administrative et touristique
            </p>
            <div style={{ display: "grid", gap: 18 }}>
              {[
                { titre: "🏛️ Présentation administrative", contenu: "L'Ogooué-Ivindo est l'une des neuf provinces du Gabon. Elle est bordée par le Cameroun et le Congo. Sa capitale est Makokou. La province est divisée en quatre départements : Ivindo, Lopé, Mvoung et Zadié." },
                { titre: "👥 Population & superficie", contenu: "Avec une superficie d'environ 46 075 km², l'Ogooué-Ivindo est l'une des plus grandes provinces du Gabon. Sa population est estimée à environ 70 000 habitants, ce qui en fait l'une des moins densément peuplées du pays." },
                { titre: "🌿 Richesses naturelles", contenu: "La province est couverte à plus de 80% par la forêt équatoriale, abritant une biodiversité exceptionnelle. Elle est traversée par les fleuves Ivindo et Ogooué, offrant des paysages d'une beauté remarquable." },
                { titre: "🏞️ Tourisme & attractions", contenu: "L'Ogooué-Ivindo abrite le Parc National d'Ivindo, célèbre pour les chutes de Kongou et de Mingouli, considérées parmi les plus belles chutes d'Afrique centrale. Le parc est aussi un refuge pour les gorilles, éléphants et chimpanzés." },
                { titre: "🐘 Faune & flore", contenu: "La province est un sanctuaire pour la faune sauvage : gorilles des plaines, éléphants de forêt, chimpanzés, buffles et une grande variété d'oiseaux tropicaux. Les forêts abritent également des essences rares comme l'okoumé et le kevazingo." },
                { titre: "🛤️ Économie", contenu: "L'économie de la province repose principalement sur l'exploitation forestière, l'agriculture de subsistance et l'élevage. Le tourisme écologique représente un potentiel de développement important grâce aux richesses naturelles exceptionnelles de la région." },
              ].map((card, i) => (
                <div key={i} style={{
                  background: "rgba(0,0,0,0.35)", border: "1px solid rgba(0,158,96,0.25)",
                  borderRadius: 14, padding: "22px 22px",
                }}>
                  <h3 style={{ color: COLORS.jaune, fontSize: 16, margin: "0 0 10px", fontWeight: "bold" }}>{card.titre}</h3>
                  <p style={{ color: "rgba(240,234,214,0.65)", fontSize: 14, lineHeight: 1.75, margin: 0 }}>{card.contenu}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveTab("infos")} style={{
              position: "fixed", bottom: "max(90px, env(safe-area-inset-bottom, 24px) + 70px)", right: 24,
              background: COLORS.vert, border: "none", color: "#fff",
              borderRadius: 50, padding: "12px 20px", fontSize: 14,
              cursor: "pointer", fontFamily: "inherit", fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(0,0,0,0.4)", zIndex: 9999,
              WebkitTapHighlightColor: "transparent",
            }}>← Retour</button>
          </div>
        )}

      </main>

<footer style={{
        textAlign: "center", padding: "28px 24px",
        borderTop: "1px solid rgba(200,150,12,0.15)",
        color: "rgba(240,234,214,0.35)", fontSize: 12,
        position: "relative", zIndex: 5,
      }}>
       <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 18 }}>
          <a href="https://www.facebook.com/share/1BgZF6krBR/" target="_blank" rel="noreferrer">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z"/>
            </svg>
          </a>
         <a href="https://youtube.com/@metandoumiamekambo?si=C7aj2qRzWSp7QtCh" target="_blank" rel="noreferrer">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF0000">
              <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/>
            </svg>
          </a>
         <a href="https://www.tiktok.com/@metandou.mia.mekambo?_r=1&_t=ZN-98EErm9WA0U" target="_blank" rel="noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
              <path d="M16.6 5.82c-1.02-.9-1.63-2.2-1.63-3.62h-3.05v14.4c0 1.51-1.23 2.74-2.74 2.74a2.74 2.74 0 0 1 0-5.48c.28 0 .55.04.8.12V10.9a5.8 5.8 0 0 0-.8-.06 5.78 5.78 0 0 0-5.78 5.78A5.78 5.78 0 0 0 9.18 22.4a5.78 5.78 0 0 0 5.78-5.78V9.18a8.16 8.16 0 0 0 4.76 1.52V7.65a4.85 4.85 0 0 1-3.12-1.83z"/>
            </svg>
          </a>
        </div>
        <div style={{ marginBottom: 6 }}> Makokou 2026 — By Metandou Mia Mekambo</div>
    
 </footer>
{!showAssistant && !showIntro && (
      <div
        onClick={() => setShowAssistant(true)}
        style={{
          position: "fixed",
          bottom: "max(20px, env(safe-area-inset-bottom, 20px))",
          left: 20,
          background: COLORS.vert,
          border: `2px solid ${COLORS.jaune}`,
          borderRadius: 50,
          padding: "10px 18px 10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
          zIndex: 9998,
        }}
      >
        <span style={{ fontSize: 22 }}>🎙️</span>
        <span style={{ color: "#fff", fontSize: 13, fontWeight: "bold" }}>Assistant vocal</span>
      </div>
    )}

    {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
    {showAssistant && <VoiceAssistant onClose={() => setShowAssistant(false)} />}
    {showGalerieCollab && <GalerieCollaborative onClose={() => setShowGalerieCollab(false)} />}
  </div>
  );
}
