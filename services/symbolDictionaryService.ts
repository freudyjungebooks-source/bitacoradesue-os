class SymbolDictionaryService {
  symbols: any[] = [];

  async initializeIfEmpty() {
    if (this.symbols.length > 0) return;

    const res = await fetch('/data/classicalSymbols.json');
    this.symbols = await res.json();
  }

  detectEmotionalSensitivity(text: string) {
    const sensitiveWords = [
      "muerte",
      "suicidio",
      "depresion",
      "dolor",
      "crisis",
      "herida",
      "enfermedad",
      "soledad",
      "desesperacion"
    ];

    const t = text.toLowerCase();
    return sensitiveWords.some(word => t.includes(word));
  }

  searchSymbol(query: string) {
    if (!query) return null;

    const q = query.toLowerCase().trim();

    // 1. Coincidencia exacta
    const exact = this.symbols.find(
      s => s.symbol.toLowerCase() === q
    );
    if (exact) return { ...exact, emotionalAlert: this.detectEmotionalSensitivity(q) };

    // 2. Coincidencia por related
    const relatedMatch = this.symbols.find(
      s =>
        s.related &&
        s.related.some((r: string) =>
          r.toLowerCase().includes(q)
        )
    );
    if (relatedMatch)
      return { ...relatedMatch, emotionalAlert: this.detectEmotionalSensitivity(q) };

    // 3. Coincidencia por categoría
    const categoryMatch = this.symbols.find(
      s =>
        s.category &&
        s.category.toLowerCase().includes(q)
    );
    if (categoryMatch)
      return { ...categoryMatch, emotionalAlert: this.detectEmotionalSensitivity(q) };

    return null;
  }
}

export const symbolDictionaryService = new SymbolDictionaryService();
