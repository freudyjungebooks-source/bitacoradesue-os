import { useEffect, useState } from "react";

interface SymbolItem {
  symbol: string;
  category: string;
  mainDefinition: string;
  culturalLayer?: string;
  archetypalLayer?: string;
  transformativeDimension?: string;
  processAxis?: string;
  emotionalResonance?: string;
  guidingQuestions?: string[];
  related?: string[];
  isEmergent?: boolean;
}

export default function SymbolSearch() {
  const [symbols, setSymbols] = useState<SymbolItem[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SymbolItem | null>(null);

  useEffect(() => {
    fetch("/data/classicalSymbols.json")
      .then((res) => res.json())
      .then((data) => setSymbols(data))
      .catch((err) => console.error("Error cargando símbolos:", err));
  }, []);

  const handleSearch = () => {
    const found = symbols.find(
      (s) => s.symbol.toLowerCase() === query.toLowerCase()
    );
    setSelected(found || null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Exploración Simbólica</h2>

      <input
        type="text"
        placeholder="Escribe un símbolo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "0.5rem" }}
      />

      <button onClick={handleSearch} style={{ padding: "0.5rem" }}>
        Buscar
      </button>

      {selected && (
        <div style={{ marginTop: "2rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
          <h3>{selected.symbol}</h3>
          <p><strong>Categoría:</strong> {selected.category}</p>
          <p>{selected.mainDefinition}</p>

          {selected.culturalLayer && (
            <p><strong>Capa cultural:</strong> {selected.culturalLayer}</p>
          )}

          {selected.archetypalLayer && (
            <p><strong>Capa arquetipal:</strong> {selected.archetypalLayer}</p>
          )}

          {selected.transformativeDimension && (
            <p><strong>Dimensión transformativa:</strong> {selected.transformativeDimension}</p>
          )}

          {selected.processAxis && (
            <p><strong>Eje del proceso:</strong> {selected.processAxis}</p>
          )}

          {selected.emotionalResonance && (
            <p><strong>Resonancia emocional:</strong> {selected.emotionalResonance}</p>
          )}

          {selected.guidingQuestions && (
            <div>
              <strong>Preguntas guía:</strong>
              <ul>
                {selected.guidingQuestions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          {selected.related && (
            <p><strong>Relacionado con:</strong> {selected.related.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}
