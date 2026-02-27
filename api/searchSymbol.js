export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { symbol } = req.body;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY no configurada" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Explica el significado cultural, simbólico y psicológico del símbolo: ${symbol}.
Devuelve únicamente JSON válido con estas claves:
mainDefinition,
emotionalResonance,
reflexiveClosure,
guidingQuestions (array),
category`
                }
              ]
            }
          ]
       
