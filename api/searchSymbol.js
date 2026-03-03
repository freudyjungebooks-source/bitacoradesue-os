searchSymbol(query: string) {
  if (!query) return null;

  const q = query.toLowerCase().trim();

  // 1. Coincidencia exacta
  const exact = this.symbols.find(
    (s: any) => s.symbol.toLowerCase() === q
  );
  if (exact) return exact;

  // 2. Coincidencia por related
  const relatedMatch = this.symbols.find(
    (s: any) =>
      s.related &&
      s.related.some((r: string) =>
        r.toLowerCase().includes(q)
      )
  );
  if (relatedMatch) return relatedMatch;

  // 3. Coincidencia por categoría
  const categoryMatch = this.symbols.find(
    (s: any) =>
      s.category &&
      s.category.toLowerCase().includes(q)
  );
  if (categoryMatch) return categoryMatch;

  // 4. Coincidencia por eje de proceso (atlas transversal)
  const processMatch = this.symbols.filter(
    (s: any) =>
      s.processAxis &&
      s.processAxis.toLowerCase().includes(q)
  );

  if (processMatch.length > 0) {
    return {
      symbol: "Eje simbólico relacionado",
      definicionAcademica:
        "La palabra ingresada no corresponde a un símbolo específico, pero pertenece a un eje de transformación presente en el atlas.",
      resonanciaEmocional:
        "Explora los siguientes símbolos vinculados a este proceso.",
      category: "Eje",
      relatedSymbols: processMatch
    };
  }

  return null;
}
