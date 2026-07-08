exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { question, context } = JSON.parse(event.body);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: `Tu es un assistant-conseiller vocal pour les visiteurs de la Fête de la Libération à Makokou, Gabon (30 août 2026). Réponds en français, de façon chaleureuse, concise (2-4 phrases maximum, adaptées à une lecture à voix haute) et pratique. Utilise les informations suivantes sur l'événement quand c'est pertinent :\n\n${context || "Aucun contexte supplémentaire fourni."}\n\nSi tu ne sais pas répondre avec certitude à une question, dis-le simplement et propose de se renseigner sur place plutôt que d'inventer une information.`,
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur API Anthropic:", data);
      return { statusCode: 500, body: JSON.stringify({ error: "Erreur API" }) };
    }

    const answer = data.content?.[0]?.text || "Désolé, je n'ai pas pu générer de réponse.";

    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (e) {
    console.error("Erreur fonction assistant:", e);
    return { statusCode: 500, body: JSON.stringify({ error: "Erreur serveur" }) };
  }
};
