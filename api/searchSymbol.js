import symbols from "../public/data/classicalSymbols.json";

export default function searchSymbol(query) {

  if (!query) return null;

  const q = query.toLowerCase().trim();

  // 1️⃣ Coincidencia exacta
  const exact = symbols.find(
    (s) => s.symbol.toLowerCase() === q
  );

  if (exact) return exact;

  // 2️⃣ Coincidencia por palabras relacionadas
  const relatedMatch = symbols.find(
    (s) =>
      s.related &&
      s.related.some((r) =>
        r.toLowerCase().includes(q)
      )
  );

  if (relatedMatch) return relatedMatch;

  // 3️⃣ Coincidencia por categoría
  const categoryMatch = symbols.find(
    (s) =>
      s.category &&
      s.category.toLowerCase().includes(q)
  );

  if (categoryMatch) return categoryMatch;

  // 4️⃣ Coincidencia por eje de proceso (constelación simbólica)
  const processMatch = symbols.filter(
    (s) =>
      s.processAxis &&
      s.processAxis.toLowerCase().includes(q)
  );

  if (processMatch.length > 0) {
    return {
      symbol: "Eje simbólico relacionado",
      definicionAcademica:
        "La palabra ingresada no corresponde a un símbolo específico pero pertenece a un proceso simbólico presente en el atlas.",
      resonanciaEmocional:
        "Explora los símbolos vinculados a este eje de transformación.",
      category: "Eje",
      relatedSymbols: processMatch
    };
  }

  return null;
}
