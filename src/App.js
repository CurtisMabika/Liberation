import { useState, useEffect } from "react";

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


const infos = [
  { label: "", valeur: "Ogooué-Ivindo", icon: "📍" },
  { label: "Ville hôte", valeur: "Makokou", icon: "🏙️" },
  { label: "Date", valeur: "30 Août 2026", icon: "📅" },
  { label: "Entrée", valeur: "Gratuite & ouverte à tous", icon: "🎟️" },
];

const COLORS = {
  vert: "#009e60",
  jaune: "#fcd116",
  bleu: "#003082",
  or: "#c8960c",
};

export default function App() {
  const countdown = useCountdown(TARGET_DATE);
  const [activeTab, setActiveTab] = useState("accueil");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, #0a1a0a 0%, #0d2b0d 40%, #0a1520 100%)`,
      fontFamily: "'Georgia', serif",
      color: "#f0ead6",
      overflowX: "hidden",
    }}>
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0,158,96,0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(252,209,22,0.06) 0%, transparent 50%)`,
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
            { id: "programme", label: "Programme" },
           { id: "infos", label: "Infos pratiques" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "8px 20px",
              border: "none",
              background: activeTab === tab.id ? COLORS.vert : "transparent",
              color: activeTab === tab.id ? "#fff" : "rgba(240,234,214,0.65)",
              borderRadius: "6px 6px 0 0",
              cursor: "pointer",
              fontSize: 14,
              fontFamily: "inherit",
              fontWeight: activeTab === tab.id ? "bold" : "normal",
              transition: "all 0.2s",
              letterSpacing: 0.5,
            }}>{tab.label}</button>
          ))}
        </nav>
      </header>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px", position: "relative", zIndex: 5 }}>
        {activeTab === "accueil" && (
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
            <div style={{
              textAlign: "center", padding: "48px 24px 40px",
              background: "linear-gradient(135deg, rgba(0,158,96,0.12), rgba(252,209,22,0.06))",
              borderRadius: 20,
              border: "1px solid rgba(200,150,12,0.25)",
              marginBottom: 36,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>🇬🇦</div>
              <div style={{ fontSize: 13, color: COLORS.jaune, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10 }}>
                Ogooué-Ivindo • Makokou
              </div>
              <h1 style={{
                fontSize: "clamp(28px, 5vw, 52px)",
                margin: "0 0 8px",
                background: `linear-gradient(135deg, #fff 30%, ${COLORS.jaune})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                lineHeight: 1.15, fontWeight: "bold",
              }}>
                Fête de la Libération
              </h1>
              <p style={{ color: "rgba(240,234,214,0.7)", fontSize: 16, maxWidth: 520, margin: "12px auto 0", lineHeight: 1.7 }}>
                Célébrons ensemble la liberté, l'unité et la fierté nationale à Makokou,
                capitale de la province de l'Ogooué-Ivindo.
              </p>
            </div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 13, color: COLORS.jaune, letterSpacing: 3, textTransform: "uppercase" }}>
                  ⏳ Compte à rebours
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {Object.entries(countdown).map(([unit, val]) => (
                  <div key={unit} style={{
                    background: "rgba(0,0,0,0.4)",
                    border: `1px solid rgba(200,150,12,0.3)`,
                    borderRadius: 14, padding: "20px 8px", textAlign: "center",
                  }}>
                    <div style={{
                      fontSize: "clamp(28px, 6vw, 48px)", fontWeight: "bold",
                      color: COLORS.jaune, lineHeight: 1, fontVariantNumeric: "tabular-nums",
                    }}>
                      {String(val).padStart(2, "0")}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(240,234,214,0.5)", textTransform: "uppercase", letterSpacing: 2, marginTop: 6 }}>
                      {unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
              {infos.map(info => (
                <div key={info.label} style={{
                  background: "rgba(0,158,96,0.08)", border: "1px solid rgba(0,158,96,0.2)",
                  borderRadius: 12, padding: "18px 16px", display: "flex", alignItems: "center", gap: 12,
                }}>
                  <span style={{ fontSize: 24 }}>{info.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(240,234,214,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>{info.label}</div>
                    <div style={{ fontSize: 14, fontWeight: "bold", color: "#fff", marginTop: 2 }}>{info.valeur}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "programme" && (
          <div>
            <h2 style={{ fontSize: 26, color: COLORS.jaune, marginBottom: 8, fontWeight: "bold" }}>Programme officiel</h2>
            <p style={{ color: "rgba(240,234,214,0.55)", marginBottom: 28, fontSize: 14 }}>
              Journée du 30 août 2026 — Makokou, Ogooué-Ivindo
            </p>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", left: 28, top: 0, bottom: 0, width: 2,
                background: `linear-gradient(to bottom, ${COLORS.vert}, ${COLORS.jaune}, ${COLORS.bleu})`,
                borderRadius: 2,
              }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {programmes.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 20, paddingBottom: i < programmes.length - 1 ? 28 : 0 }}>
                    <div style={{ width: 56, flexShrink: 0, display: "flex", justifyContent: "center" }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: `rgba(0,0,0,0.6)`, border: `2px solid ${COLORS.or}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18, zIndex: 1, position: "relative",
                      }}>
                        {item.icon}
                      </div>
                    </div>
                    <div style={{
                      flex: 1, background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(200,150,12,0.18)", borderRadius: 12, padding: "14px 18px",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                        <span style={{
                          background: COLORS.vert, color: "#fff",
                          borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: "bold", letterSpacing: 1,
                        }}>{item.heure}</span>
                        <span style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>{item.titre}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "rgba(240,234,214,0.5)", marginTop: 6 }}>
                        📍 {item.lieu}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === "infos" && (
          <div>
            <h2 style={{ fontSize: 26, color: COLORS.jaune, marginBottom: 28, fontWeight: "bold" }}>Infos pratiques</h2>
            <div style={{ display: "grid", gap: 18 }}>
              {[
                { titre: "🗺️ Comment venir à Makokou ?", contenu: "Makokou est accessible par la route nationale depuis Libreville (~620 km) ou par avion via l'Aéroport de Makokou (MKU). Des transports en commun (bus, taxis-brousse) sont disponibles depuis les grandes villes du Gabon." },
                {
  titre: "🏨 Hébergement",
  contenu: (
    <div>
      <p style={{marginTop:0, marginBottom:12}}>Voici les hôtels disponibles à Makokou. Réservez à l'avance !</p>
      {[
        { nom: "Hôtel Belinga", tel: "066 07 46 00", note: "⭐⭐⭐⭐⭐ Top", couleur: "#009e60" },
        { nom: "Hôtel VIP", tel: "066 56 96 98", note: "⭐⭐⭐⭐ Bien", couleur: "#fcd116" },
        { nom: "Hôtel Arizona", tel: "062 41 87 33", note: "⭐⭐⭐⭐ Bien", couleur: "#fcd116" },
        { nom: "Wamy Hôtel", tel: "062 25 32 22", note: "⭐⭐⭐⭐ Bien", couleur: "#fcd116" },
        { nom: "Hôtel de la Mairie", tel: "065 72 37 04", note: "⭐⭐⭐ Passable", couleur: "#c8960c" },
        { nom: "Hôtel le Bordelais", tel: "066 43 26 50", note: "⭐⭐⭐ Passable", couleur: "#c8960c" },
        { nom: "Hôtel de l'Assemblée Départementale", tel: null, note: "⭐⭐⭐ Passable", couleur: "#c8960c" },
        { nom: "Motel des Voyageurs", tel: "077 10 20 21", note: "⭐⭐ Faible", couleur: "#ff6b35" },
        { nom: "Starlyn Hotel", tel: null, note: "⭐ Très Faible", couleur: "#cc3333" },
      ].map((h, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 12px", marginBottom: 8,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
          flexWrap: "wrap", gap: 6,
        }}>
          <div>
            <div style={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}>{h.nom}</div>
            {h.tel && <div style={{ color: "rgba(240,234,214,0.5)", fontSize: 12, marginTop: 2 }}>📞 {h.tel}</div>}
          </div>
          <span style={{
            background: "rgba(0,0,0,0.3)", border: `1px solid ${h.couleur}`,
            color: h.couleur, borderRadius: 20, padding: "3px 10px", fontSize: 11, whiteSpace: "nowrap"
          }}>{h.note}</span>
        </div>
      ))}
    </div>
  )
},
                { titre: "🎟️ Accès aux événements", contenu: "L'entrée à toutes les festivités est entièrement gratuite et ouverte à l'ensemble de la population gabonaise et aux visiteurs étrangers. Venez en famille !" },
    {
  titre: "🌿 Ogooué-Ivindo",
  contenu: "Découvrir la province →",
  lien: true
},           
  { titre: "📞 Contact officiel", contenu: "Pour toute information complémentaire, contactez la Préfecture de l'Ogooué-Ivindo ou la Mairie de Makokou." },
              ].map((card, i) => (
                <div key={i} onClick={() => card.lien && setActiveTab("ogoue")} style={{
  background: "rgba(0,0,0,0.35)",
  border: card.lien ? "1px solid rgba(0,158,96,0.4)" : "1px solid rgba(200,150,12,0.2)",
  borderRadius: 14, padding: "22px 22px",
  cursor: card.lien ? "pointer" : "default",
}}>
  <h3 style={{ color: card.lien ? "#009e60" : "#fff", fontSize: 16, margin: "0 0 10px", fontWeight: "bold" }}>{card.titre}</h3>
  <div style={{ color: "rgba(240,234,214,0.65)", fontSize: 14, lineHeight: 1.75, margin: 0 }}>
    {card.lien ? <span style={{ color: "#fcd116" }}>Découvrir la province →</span> : card.contenu}
  </div>
</div>
              ))}
            </div>
          </div>
       )}

{activeTab === "ogoue" && (
  <div>
<button onClick={() => setActiveTab("infos")} style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      background: COLORS.vert,
      border: "none",
      color: "#fff",
      borderRadius: 50,
      padding: "12px 20px",
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: "bold",
      boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
      zIndex: 100,
    }}>← Retour</button>
    <h2 style={{ fontSize: 26, color: COLORS.jaune, marginBottom: 8, fontWeight: "bold" }}>Ogooué-Ivindo</h2>
            <p style={{ color: "rgba(240,234,214,0.55)", marginBottom: 28, fontSize: 14 }}>
              Province du Gabon — Présentation administrative et touristique
            </p>
            <div style={{ display: "grid", gap: 18 }}>
              {[
                {
                  titre: "🏛️ Présentation administrative",
                  contenu: "L'Ogooué-Ivindo est l'une des neuf provinces du Gabon. Elle est bordée par le Cameroun et le Congo. Sa capitale est Makokou. La province est divisée en quatre départements : Ivindo, Lopé, Mvoung et Zadié."
                },
                {
                  titre: "👥 Population & superficie",
                  contenu: "Avec une superficie d'environ 46 075 km², l'Ogooué-Ivindo est l'une des plus grandes provinces du Gabon. Sa population est estimée à environ 70 000 habitants, ce qui en fait l'une des moins densément peuplées du pays."
                },
                {
                  titre: "🌿 Richesses naturelles",
                  contenu: "La province est couverte à plus de 80% par la forêt équatoriale, abritant une biodiversité exceptionnelle. Elle est traversée par les fleuves Ivindo et Ogooué, offrant des paysages d'une beauté remarquable."
                },
                {
                  titre: "🏞️ Tourisme & attractions",
                  contenu: "L'Ogooué-Ivindo abrite le Parc National d'Ivindo, célèbre pour les chutes de Kongou et de Mingouli, considérées parmi les plus belles chutes d'Afrique centrale. Le parc est aussi un refuge pour les gorilles, éléphants et chimpanzés."
                },
                {
                  titre: "🐘 Faune & flore",
                  contenu: "La province est un sanctuaire pour la faune sauvage : gorilles des plaines, éléphants de forêt, chimpanzés, buffles et une grande variété d'oiseaux tropicaux. Les forêts abritent également des essences rares comme l'okoumé et le kevazingo."
                },
                {
                  titre: "🛤️ Économie",
                  contenu: "L'économie de la province repose principalement sur l'exploitation forestière, l'agriculture de subsistance et l'élevage. Le tourisme écologique représente un potentiel de développement important grâce aux richesses naturelles exceptionnelles de la région."
                },
              ].map((card, i) => (
                <div key={i} style={{
                  background: "rgba(0,0,0,0.35)",
                  border: "1px solid rgba(0,158,96,0.25)",
                  borderRadius: 14, padding: "22px 22px",
                }}>
                  <h3 style={{ color: COLORS.jaune, fontSize: 16, margin: "0 0 10px", fontWeight: "bold" }}>{card.titre}</h3>
                  <p style={{ color: "rgba(240,234,214,0.65)", fontSize: 14, lineHeight: 1.75, margin: 0 }}>{card.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <footer style={{
        textAlign: "center", padding: "28px 24px",
        borderTop: "1px solid rgba(200,150,12,0.15)",
        color: "rgba(240,234,214,0.35)", fontSize: 12,
        position: "relative", zIndex: 5,
      }}>
        <div style={{ marginBottom: 6 }}>🇬🇦 République Gabonaise — Fête de la Libération 2026 • 30 Août</div>
        <div>Province de l'Ogooué-Ivindo • Makokou</div>
      </footer>
    </div>
  );
}
