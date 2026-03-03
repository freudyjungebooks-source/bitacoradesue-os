export interface CulturalLayer {
  tradition: string;
  sourceContext: string;
  meaning: string;
}

export interface SymbolEntry {
  symbol: string;
  category: string;
  mainDefinition: string;
  archetypalLayer: string;
  transformativeDimension: string;
  processAxis: string;
  emotionalResonance: string;
  related: string[];
  culturalComparative: CulturalLayer[];
}

class SymbolDictionaryService {
  private symbols: SymbolEntry[] = [];

  async initialize() {
    if (this.symbols.length > 0) return;

    const response = await fetch("/src/data/classicalSymbols.json");
    this.symbols = await response.json();
  }

  private detectEmotionalAlert(text: string): boolean {
    const sensitive = [
      "muerte",
      "suicidio",
      "depresion",
      "crisis",
      "dolor",
      "soledad",
      "desesperacion",
      "enfermedad"
    ];

    return sensitive.some(word =>
      text.toLowerCase().includes(word)
    );
  }

  search(query: string) {
    if (!query) return null;

    const q = query.toLowerCase().trim();

    const exact = this.symbols.find(
      s => s.symbol.toLowerCase() === q
    );

    if (exact) {
      return {
        ...exact,
        emotionalAlert: this.detectEmotionalAlert(q)
      };
    }

    const related = this.symbols.find(
      s => s.related?.some(r =>
        r.toLowerCase().includes(q)
      )
    );

    if (related) {
      return {
        ...related,
        emotionalAlert: this.detectEmotionalAlert(q)
      };
    }

    return null;
  }
}

export const symbolDictionaryService = new SymbolDictionaryService();
