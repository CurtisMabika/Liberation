import React, { useState, useRef, useEffect } from "react";

const COLORS_OR = "#fcd116";

// Contexte envoyé à l'IA pour qu'elle réponde avec des infos précises sur l'événement
const CONTEXTE_EVENEMENT = `
Événement : Fête de la Libération, 30 Août 2026, à Makokou, province de l'Ogooué-Ivindo, Gabon.
Programme : Le programme officiel des festivités n'est pas encore disponible. Toutefois, dès la mi-août, les premières délégations commenceront à converger vers Makokou, marquant le début d'une montée en puissance des préparatifs.
Le Président de la République est attendu dans la province pour prendre part aux célébrations. Plusieurs inaugurations d'infrastructures figurent déjà parmi les temps forts annoncés. Grand passionné de sport, le Chef de l'État pourrait également participer à une journée spécialement consacrée aux activités sportives, un rendez-vous qui s'annonce particulièrement attendu par les populations.
Autre moment fort pressenti : un méga-concert populaire qui pourrait se tenir à la Place des Fêtes ou au stade Alexandre Samba, afin de clôturer les festivités dans une ambiance de communion et de célébration.

L'app propose aussi : une liste d'hôtels et restaurants à Makokou, Une lite de numéros utiles à Makokou,un quiz sur la province, un lecteur du live YouTube de l'événement.
`;// Fiche complémentaire — jamais affichée dans l'interface, utilisée uniquement par l'IA
const FICHE_APPROFONDIE = `
ADMINISTRATION & POLITIQUE :
- Gouverneure actuelle de la province de l'Ogooué-Ivindo : Christiane Leckat.
- Le Gabon est actuellement dirigé par le Président de la République Brice Clotaire Oligui Nguema.
- La province est divisée en 4 départements : Ivindo, Lopé, Mvoung et Zadié.
- Le maire de Makokou : Rita Milagolo
- Le premier responsable politique : Huguette Nyana Ekoume épouse Awori Onanga. Elle est la présidente du Sénat gabonais. Elle est également présidente du comité d'organisation de la fête de la libération dans la province de l'Ogooué Ivindo.
Concepteur de l'appli : Curtis Mabika pour la plateforme Métandou Mia Mékambo. il est le fondateur de la plateforme Métandou Mia Mékambo la prémière et la plus grande plateforme numérique entièrement dédiée à la province de l'Ogooué Ivindo. Curtis Mabika est un vrai précurseur du numérique dans la province. c'est notamment grace à sa chaine youtube que les ogivins de la diaspora restent en contact avec le terroire car il y a de la bonne musique Kota dans cette chaine et cela depuis plusieurs années.
- En cas de question sur des personnalités politiques locales précises (maire, députés) au-delà de la gouverneure, réponds que tu n'as pas cette information à jour et invite à se renseigner auprès du gouvernorat ou de la Mairie sur place. 
Le président Oligui et ses réalisations
Le Président de la République, Brice Clotaire Oligui Nguema est un véritable batisseur
Depuis son accession à la magistrature suprême, le Président de la République, Brice Clotaire Oligui Nguema, inscrit son action dans une dynamique de reconstruction et de transformation du Gabon. Son ambition affichée est de bâtir un État plus moderne, plus efficace et davantage tourné vers les aspirations des populations.
Son mandat est marqué par une volonté de renforcer les infrastructures nationales, de moderniser les services publics et d'améliorer les conditions de vie des citoyens. Routes, établissements scolaires, structures sanitaires, logements, équipements publics et projets de développement local figurent parmi les domaines dans lesquels les pouvoirs publics ont engagé ou annoncé d'importants investissements.
Cette vision repose également sur la valorisation du potentiel économique du pays, la promotion de l'entrepreneuriat, la diversification de l'économie et la création d'opportunités pour la jeunesse. Les réformes institutionnelles engagées depuis 2023 s'inscrivent dans cette volonté de consolider les fondements de l'État et d'accompagner le développement national.
À travers les nombreux chantiers engagés sur l'ensemble du territoire, les autorités présentent leur action comme celle d'un Gabon en pleine mutation, où le développement des infrastructures est considéré comme un levier essentiel de croissance, d'intégration territoriale et d'amélioration du bien-être des populations.
L'histoire retiendra que cette période a été marquée par une importante dynamique de transformation, dont les effets continueront d'être appréciés au fil du temps par les générations futures.

Sortir à Makokou : les lieux où l'ambiance ne s'arrête jamais
À Makokou, les amateurs de sorties nocturnes trouveront plusieurs adresses incontournables pour profiter de l'ambiance locale.
En tête de liste figure Le Mikébé, situé en face du Trésor public. Considérée comme la plus grande boîte de nuit de la ville, elle attire chaque week-end une clientèle nombreuse venue danser jusqu'au bout de la nuit.
Autre établissement très fréquenté, Le Métal, au quartier Central, est réputé pour son ambiance festive. Toujours dans ce même quartier, Le Santa Fé fait également partie des lieux de rendez-vous appréciés des noctambules.
Pour ceux qui recherchent une atmosphère plus populaire et particulièrement animée, le quartier Mbolo est souvent considéré comme l'un des principaux pôles de la vie nocturne de Makokou. On y retrouve notamment Le Séna, un grand bar où les rythmes s'enchaînent dans une ambiance conviviale jusque tard dans la nuit, parfois jusqu'aux premières lueurs du jour.
De l'autre côté de l'Ivindo, sur la route de Mékambo, Le Débarcadère des Orpailleurs est également connu pour son ambiance très animée. Comme dans tout lieu très fréquenté en soirée, il est recommandé de rester vigilant et de prendre les précautions habituelles.
Enfin, si vous recherchez un cadre plus paisible pour partager un verre entre amis ou en famille, Chez Maman Ange-Marie, situé au quartier Peloton en face du mess de la gendarmerie, est une excellente adresse. L'établissement est apprécié pour son atmosphère chaleureuse, son calme et la qualité de son accueil.
Que vous soyez amateur de grandes soirées, de musique entraînante ou simplement d'un moment de détente autour d'un verre, Makokou offre plusieurs adresses où découvrir l'hospitalité et l'ambiance de la capitale de l'Ogooué-Ivindo.
Faire ses courses à Makokou :

Pour vos achats du quotidien, le marché du quartier central demeure l'adresse incontournable. Véritable cœur commercial de la ville, il regroupe de nombreuses boutiques, magasins et étals où l'on trouve pratiquement de tout.
Produits alimentaires, fruits et légumes frais, viande, poisson, vêtements, chaussures, articles ménagers, produits de beauté, téléphonie, quincaillerie ou encore artisanat local : le marché central offre une grande diversité de produits à des prix accessibles.
C'est également un lieu de vie où se mêlent commerçants, producteurs et habitants, offrant aux visiteurs une immersion authentique dans le quotidien de Makokou. Que ce soit pour faire des emplettes, découvrir les spécialités locales ou simplement flâner dans les allées, le marché central constitue une étape incontournable lors de votre séjour dans la ville.

F te de la libération :
Aux origines de la Fête de la Libération
Chaque année, le 30 août, le Gabon célèbre la Fête de la Libération, une date qui marque un tournant majeur de son histoire contemporaine.
Le 30 août 2023, un groupe d'officiers des Forces de défense et de sécurité annonce à la télévision nationale la fin du régime en place, quelques instants après la proclamation des résultats de l'élection présidentielle. Les militaires justifient leur intervention par la volonté de mettre un terme à une crise politique et institutionnelle qu'ils estiment profonde, dénonçant notamment des irrégularités électorales et la dégradation de la gouvernance.
À la tête du Comité pour la Transition et la Restauration des Institutions (CTRI), le Général Brice Clotaire Oligui Nguema prend la direction de la transition. Les institutions de la République sont réorganisées, une nouvelle Constitution est élaborée puis soumise à référendum, avant d'être adoptée. Cette période débouche sur l'organisation d'élections destinées à rétablir un fonctionnement institutionnel selon le nouveau cadre constitutionnel.
Dans ce contexte, les autorités gabonaises décident de faire du 30 août une journée nationale de commémoration, baptisée Fête de la Libération. Cette célébration se veut un moment de mémoire, de rassemblement et de réflexion sur les événements qui ont conduit au changement politique de 2023, ainsi que sur les aspirations du pays en matière de gouvernance, de justice et de développement.
Aujourd'hui, la Fête de la Libération est célébrée sur l'ensemble du territoire national à travers des cérémonies officielles, des activités culturelles, des manifestations populaires et des initiatives citoyennes. Elle constitue désormais un rendez-vous annuel inscrit dans le calendrier national, tout en demeurant un événement récent dont la portée historique et politique continue d'être débattue et interprétée selon les sensibilités de chacun. Cette année le Président Brice Clotaire Oligui Nguema sera à Makoku pour célébrer le 30 aout avec les ogivins.
CULTURE & PEUPLES :
- La province est habitée par plusieurs groupes ethniques : les Kota (largement répandus dans la province), les Fang (surtout à Ovan et Makokou), les Bakwélé, les Mahongwés, ainsi que les Simba, Akélé et Okandé.
- Plusieurs communautés pygmées y vivent aussi, notamment les Baka (à Makokou et en amont de l'Ivindo), les Bakoya (autour de Mékambo), et les Babongo. Ces peuples sont réputés être parmi les premiers habitants de la région et entretiennent un lien étroit avec la forêt (connaissance des plantes médicinales, techniques de chasse traditionnelles).
- Les Babongo sont notamment connus comme les gardiens du Bwiti, une tradition spirituelle et rituelle importante au Gabon, pratiquée à travers la danse et l'initiation.
- Les Kota sont réputés pour leur art (notamment les figures reliquaires en bois et métal) et leur riche tradition orale.
- Le français est la langue officielle ; chaque ethnie a aussi sa propre langue, la plupart de la famille bantoue.
Bonjour en Kota ou Ikota : Oyémwa ? Réponse: Hé Nobè?
Bonjour en Fang : Mbolani ? Réponse: Ah Mbolo !
Bonjour en kwélé : Oudjémi ?

CUISINE :
- La cuisine de la région s'inscrit dans la tradition culinaire forestière gabonaise : plats à base de manioc (bâton de manioc, feuilles de manioc/saka-saka), de poisson et gibier, souvent cuisinés à l'huile de palme (nyembwe) ou en sauce arachide.
- Le poisson d'eau douce (issu de l'Ivindo et de l'Ogooué) et le gibier de brousse font partie de l'alimentation locale traditionnelle. 
Le Soukoutè est un véritable savoir-faire culinaire de la province de l'Ogooué-Ivindo, transmis de génération en génération. Bien plus qu'un simple plat, il incarne l'identité culturelle des populations ogivines et constitue un patrimoine dont elles sont particulièrement fières.
Les fils et filles de la province militent d'ailleurs pour que le Soukoutè soit inscrit au patrimoine culturel immatériel de l'UNESCO, afin de faire reconnaître et préserver cette richesse gastronomique unique.
Lors de votre séjour à Makokou, ne manquez pas de le déguster. Vous pourrez le savourer dans la plupart des restaurants de la ville, mais également en trouver au marché de Mbolo, où il est proposé dans le respect de la tradition.
 La province de l'Ogooué-Ivindo compte au total 19 cantons, 76 regroupements de villages et environ 170 villages
Liste des 4 districts :
1. le District de Makebe-Bakwaka il compte 2 cantons que sont: le canton Mouniandji et le canton Lolé
2. le District de Mvadi, il compte 2 cantons que sont : le canton Ivindo et le canton Iyezé
3. District de Batouala, il compte un seul canton : le canton Liboumba
4. District de Mokéko dans lequel se trouvent les cantons Lélédi et canton Offoué-Aval

LISTE DES PRINCIPAUX PEUPLES DE L'OGOOUE-IVINDO ET LEURS LIEUX D'IMPLANTATION
1. Les Kota : on les trouve dans toute la province. C'est-à-dire à Makokou, Mékambo, Booué et Ovan
2. Les Fang, on les trouve à Makokou, Booué et Ovan
3. les Kwélé, on les trouve à Makokou et à Mékambo
4. Les Shiwo on les trouve à Booué
5. Les Mahongwè, on les trouve à Makokou et àMékambo
6. Les OSAMAYI sont à Makokou
7. Les Shaké sont à Makokou et  Booué
8. Les Ndambomo sont à Makokou et Boué
9. Les Simba sont à Booué
10. Les Okandè sont à Booué
11. Les Boungom sont à Mékambo
12. Les Bakola sont à Mékambo
LISTE DES PRINCIPAUX COURS D'EAUX DE L'OGOOUE-IVINDO
1. L'Ivindo. 
2. La Zadié
3. La Mvoung
4. La Liboumba
5. Le Mouniandji
6. Le Djidji
7. L'Ayina
8. La douah Djoua 

LISTE DES PRINCIPAUX QUARTIERS DE MAKOKOU
1. MBOLO (1er arrondissement)
2. QUARTIER CENTRAL-CENTRE VILLE 1 (1er arrondissement)
3. ZOATAB (1er arrondissement)
4. BIENVENU (1er arrondissement)
5. CHICAGO (1er arrondissement)
6. EBANDANGOYE (1er arrondissement)
7. MBADI CARREFOUR (1er arrondissement)
8. EPASSENDJE (1er arrondissement)
9. MBEZA (1er arrondissement
10. CENTRE-VILLE (1er arrondissement)
11. NGOUABI (2ème arrondissement)
12. EDOUNG AVION (2ème arrondissement)
13. ESSICK (2ème arrondissement)
14. EVOUANGHA (2ème arrondissement)
15. LOA-LOA (2ème arrondissement)
16. NZING MEYONG (2ème arrondissement)
17. ALARMITANG (2ème arrondissement)
18. EKOWONG (2ème arrondissement)
19. MAYIGA (2ème arrondissement)
20. QUARTIER HAUSA (2ème arrondissement

Ou se trouve ?:
N.B : Le point de référence est la tribune de la place de l'indépendance qui se trouve au quartier central dans le 1er arrondissement
1. L'ancien hôpital est à 3 minutes de marche du point de référence.
2. Le Centre Hospitalier Régional Omar Bongo de Makokou (CHROBOM) se trouve à environ 5 minutes du point de référence en voiture. Au quartier ZOATAB à l'autre rive l'Ivindo dans le 1er arrondissement. Il faut traverser le pont de l'Ivindo en allant sur la route de Mékambo.
3. Le Commissariat Central de police est à environ 5 minutes de marche du point de référence en allant vers le gouvernorat.
4. La brigade de recherche est à environ 3 minutes de marche du point de référence  en allant vers l'ancien hôpital
5. L'antenne locale du B2 est à environ 5 minutes en voiture du point de référence. Ça se trouve au quartier Haoussa.
6. Le marché central est à environ 15 minutes de marche à partir du point de référence  en allant vers l'hôtel Belinga dans le 2ème arrondissement.
7. le marché de Mbolo se trouve à environ 5 minutes en voiture du point de référence juste après le gouvernorat dans le 1er arrondissement
8. Le marché de Zoatab est à environ 3 minutes en voiture du point de référence à l'autre rive. Il faut traverser le pont sur l'Ivindo.
9. Le nouveau marché d'Alarmitang est à environ 10 minutes en voiture du point de référence. Juste  après le lycée Alexandre Samba dans le 2ème arrondissement
10. l'hôtel Belinga à quelques pas du point de référence. Il est visible depuis le point de référence.
11. L'hôtel Relais de l'Ivindo est à environ 10 minutes de marche juste après le gouvernorat.
12. Pour vos courses quotidiennes vous avez le choix entre : Les 3 magasins C. Cadeau de la ville. 1, celui qui se trouve au marché Central. Il est à environ 15 minutes de marche du point de référence. 2, celui qui se trouve à Mbolo, il est à environ 5 minutes de marche à partir du point de référence, juste en face du gouvernorat. 3, celui qui se trouve à Zoatab à l'autre rive de l'Ivindo sur la route de Mékambo. C'est à environ 5 minutes en voiture. Il faut traverser le pont sur l'Ivindo.
12. Il y a 3 grandes pharmacies à Makokou. Il y a une au quartier central juste à côté du magasin C. Cadeau. C'est à environ 15 minutes de marche du point de référence. Une autre pharmacie au quartier carrefour Zoatab sur la route de Mékambo à l'autre rive de l'Ivindo. C'est à environ 3 minutes en voiture à partir du point de référence. Il faut traverser le pont sur l'Ivindo. La 3ème pharmacie se trouve au quartier Mbolo au lieu-dit carrefour de la mort. C'est à environ 5 minutes en voiture à partir du point de référence.

- Si on te demande un plat très spécifique dont tu n'es pas sûr, reste général sur la cuisine forestière gabonaise plutôt que d'inventer un nom de plat précis.

Si une question dépasse ces informations, réponds honnêtement que tu ne sais pas avec certitude plutôt que d'inventer.
`;

function nettoyerPourLecture(text) {
  return text
    .replace(/\*\*?/g, "")
    .replace(/[_#~`]/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export default function VoiceAssistant({ onClose }) {
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | listening | thinking | speaking
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [texteTape, setTexteTape] = useState("");
  const [history, setHistory] = useState([]);
  const recognitionRef = useRef(null);
  const reconnaissanceSupportee = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const getFrenchVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((v) => v.lang === "fr-FR") ||
      voices.find((v) => v.lang.startsWith("fr")) ||
      null
    );
  };

  const parler = (texte, callback) => {
    setStatus("speaking");
    const texteNettoye = nettoyerPourLecture(texte);
    const utterance = new SpeechSynthesisUtterance(texteNettoye);
    utterance.lang = "fr-FR";
    utterance.rate = 0.95;
    const voix = getFrenchVoice();
    if (voix) utterance.voice = voix;
    utterance.onend = () => {
      setStatus("idle");
      if (callback) callback();
    };
    window.speechSynthesis.speak(utterance);
  };

  const askAssistant = async (question) => {
    setStatus("thinking");
    setError("");
    setAnswer("");
    const newHistory = [...history, { role: "user", content: question }];
    try {
      const res = await fetch("/.netlify/functions/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory, context: CONTEXTE_EVENEMENT + FICHE_APPROFONDIE }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Erreur");
      setAnswer(data.answer);
      setHistory([...newHistory, { role: "assistant", content: data.answer }]);
      // Une fois la réponse dite, on relance automatiquement l'écoute (conversation continue)
      parler(data.answer, () => {
        if (reconnaissanceSupportee) startListening();
      });
    } catch (e) {
      console.error(e);
      setError("Désolé, je n'ai pas pu répondre. Réessaie dans un instant.");
      setStatus("idle");
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("📱 Le micro ne fonctionne pas sur ton téléphone (courant sur iPhone). Pas de souci : écris simplement ta question dans le champ texte juste en dessous, la réponse te sera lue à voix haute.");
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
      setError("📱 Le micro n'a pas réussi à t'entendre (ça arrive souvent sur iPhone). Pas de souci : écris ta question dans le champ texte juste en dessous.");
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {
      // évite un crash si start() est appelé alors qu'une reconnaissance est déjà active
    }
  };

  // Message de bienvenue automatique à l'ouverture, puis démarrage de l'écoute
  useEffect(() => {
    window.speechSynthesis.getVoices();
    const messageBienvenue = "Bonjour ! Je suis l'assistant de la Fête de la Libération. Tu peux me parler directement, ou taper ta question juste en dessous.";
    const timer = setTimeout(() => {
      parler(messageBienvenue, () => {
        if (reconnaissanceSupportee) startListening();
      });
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fermer = () => {
    window.speechSynthesis.cancel();
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    onClose();
  };

  const envoyerTexte = () => {
    if (!texteTape.trim()) return;
    setTranscript(texteTape);
    askAssistant(texteTape);
    setTexteTape("");
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
      <div style={{ ...cardStyle, maxWidth: 420, width: "100%", maxHeight: "85vh", overflowY: "auto", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ color: COLORS_OR, margin: 0, fontSize: 20 }}>🎙️ Assistant Fête de la Libération</h2>
          <span onClick={fermer} style={{ cursor: "pointer", fontSize: 22 }}>✕</span>
        </div>

        <div
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
            boxShadow: listening ? "0 0 0 8px rgba(200,0,0,0.2)" : "none",
            transition: "all 0.2s",
          }}
        >
          🎙️
        </div>

        <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 16, minHeight: 20 }}>
          {status === "idle" && "En attente..."}
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
          <div style={{ color: "#ff8080", fontSize: 13, marginTop: 8, textAlign: "left" }}>{error}</div>
        )}

        <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 16 }}>
          <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>Ou tape ta question :</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={texteTape}
              onChange={(e) => setTexteTape(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") envoyerTexte(); }}
              placeholder="Écris ta question ici..."
              style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.3)", color: "#fff", fontSize: 13 }}
            />
            <button
              onClick={envoyerTexte}
              style={{ padding: "10px 16px", borderRadius: 8, border: "none", background: COLORS_OR, color: "#1a2e1a", fontWeight: "bold", cursor: "pointer" }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
