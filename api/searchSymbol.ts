export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { symbol } = req.body;

  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Explica el significado cultural, simbólico y psicológico del símbolo: ${symbol}.
Devuelve la respuesta en formato JSON con estas claves:
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

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: errorText });
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Error consultando Gemini' });
  }
}
