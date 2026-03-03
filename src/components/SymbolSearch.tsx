import React, { useEffect, useState } from "react";
import { symbolDictionaryService } from "../services/symbolDictionaryService";

const SymbolSearch = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [personalMeaning, setPersonalMeaning] = useState("");

  useEffect(() => {
    symbolDictionaryService.initialize();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = symbolDictionaryService.search(query);
    setResult(res);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Atlas Simbólico Cultural y Pedagógico</h2>

      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Explora un símbolo..."
        />
        <button type="submit">Buscar</button>
      </form>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>{result.symbol}</h3>

          <p><strong>Definición:</strong> {result.mainDefinition}</p>
          <p><strong>Capa arquetípica:</strong> {result.archetypalLayer}</p>
          <p><strong>Dimensión transformativa:</strong> {result.transformativeDimension}</p>

          <h4>Comparación cultural</h4>
          {result.culturalComparative.map((c: any, index: number) => (
            <div key={index} style={{ marginBottom: 15 }}>
              <strong>{c.tradition}</strong>
              <div style={{ fontSize: 12 }}>{c.sourceContext}</div>
              <div>{c.meaning}</div>
            </div>
          ))}

          {result.emotionalAlert && (
            <div style={{ marginTop: 20, padding: 10, background: "#f4e7d3" }}>
              Este símbolo puede estar relacionado con momentos sensibles.
              ¿Deseas hablar con alguien de confianza o buscar acompañamiento profesional?
            </div>
          )}

          <h4>Tu significado personal</h4>
          <textarea
            value={personalMeaning}
            onChange={(e) => setPersonalMeaning(e.target.value)}
            placeholder="¿Qué significa este símbolo para ti hoy?"
          />
        </div>
      )}
    </div>
  );
};

export default SymbolSearch;
