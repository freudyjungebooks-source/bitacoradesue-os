const response = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: `Explica el significado simbólico de ${symbol} desde una perspectiva psicológica.` }
          ]
        }
      ]
    })
  }
);
