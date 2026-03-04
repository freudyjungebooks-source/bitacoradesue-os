import React, { useState, useEffect } from "react";

const SymbolSearch = () => {
  const [query, setQuery] = useState("");
  const [symbols, setSymbols] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetch("/classicalSymbols.json")
      .then(res => res.json())
      .then(data => setSymbols(data));
  }, []);

  const handleSearch = () => {
    const found = symbols.find(
      s => s.symbol.toLowerCase() === query.toLowerCase()
    );
    setResult(found || null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Exploración simbólica</h2>

      <input
        type="text"
        placeholder="Escribe un símbolo..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <button onClick={handleSearch}>Buscar</button>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>{result.symbol}</h3>
          <p><strong>Categoría:</strong> {result.category}</p>
          <p>{result.mainDefinition}</p>
          <p><strong>Resonancia emocional:</strong> {result.emotionalResonance}</p>

          {result.processAxis && (
            <p><strong>Eje del proceso:</strong> {result.processAxis}</p>
          )}

          {result.relacionEmocionCuerpo && (
            <div style={{ marginTop: 25, padding: 15, border: "1px solid #ccc" }}>
              <h4>Relación – Emoción – Cuerpo</h4>

              <p style={{ fontStyle: "italic" }}>
                {result.relacionEmocionCuerpo.advertencia}
              </p>

              <h5>Dinámica relacional</h5>
              <ul>
                {result.relacionEmocionCuerpo.dinamicaRelacional.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>

              <h5>Impacto emocional posible</h5>
              <ul>
                {result.relacionEmocionCuerpo.posiblesImpactosEmocionales.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>

              <h5>Exploración corporal simbólica</h5>
              <ul>
                {result.relacionEmocionCuerpo.exploracionCorporalSimbolica.map(
                  (item: any, index: number) => (
                    <li key={index}>
                      <strong>{item.zona}:</strong> {item.lectura}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SymbolSearch;
