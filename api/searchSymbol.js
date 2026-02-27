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
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
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
        })
      }
    );

    const rawText = await response.text();

    if (!response.ok) {
      return res.status(500).json({
        error: "Error desde Gemini",
        details: rawText
      });
    }

    const data = JSON.parse(rawText);

    const generatedText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return res.status(500).json({
        error: "Respuesta inválida de Gemini"
      });
    }

    const cleanJson = JSON.parse(generatedText);

    return res.status(200).json(cleanJson);

  } catch (error) {
    return res.status(500).json({
      error: "Error procesando la solicitud",
      details: error.message
    });
  }
}
