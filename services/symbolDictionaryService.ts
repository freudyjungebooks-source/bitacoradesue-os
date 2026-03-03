import { PersonalWord, SymbolicCategory } from '../types';
import { normalizeSystemText } from '../utils/linguisticNormalizer';

export interface SymbolEntry extends PersonalWord {
  metaphors: string[];
  userValidation?: string;
  isConfirmedByAuthor: boolean;
  type: 'clásico' | 'personal' | 'emergente';
  isIntimate?: boolean;
  related?: string[];
}

const STORAGE_KEY = 'bitacora_diccionario_v7_local_only';

export const symbolDictionaryService = {

  async initializeIfEmpty(): Promise<void> {
    const current = this.getAllSymbols();

    if (current.length === 0) {
      try {

        const response = await fetch('/data/classicalSymbols.json');

        if (!response.ok) {
          throw new Error("No se pudo cargar el diccionario local.");
        }

        const classics: any[] = await response.json();

        const initialEntries: SymbolEntry[] = classics.map(s => ({
          id: `classic-${s.symbol.toLowerCase()}`,
          word: normalizeSystemText(s.symbol),
          meaning: s.mainDefinition,
          category: s.category as SymbolicCategory,
          origin: 'clásico',
          type: 'clásico',
          isIntimate: false,
          related: s.related || [],
          classicalData: s,
          definicionPersonal: "",
          definicionAcademica: s.mainDefinition,
          resonanciaEmocional: s.emotionalResonance,
          isConfirmedByAuthor: false,
          createdAt: new Date().toISOString(),
          metaphors: []
        }));

        this.saveSymbols(initialEntries);

      } catch (e) {
        console.error("Error en inicialización del Diccionario:", e);
      }
    }
  },

  getAllSymbols(): SymbolEntry[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  },

  saveSymbols(symbols: SymbolEntry[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(symbols));
  },

  searchSymbol(term: string): SymbolEntry | null {
    const symbols = this.getAllSymbols();
    const normalized = normalizeSystemText(term);

    // 1. Coincidencia exacta
    const exact = symbols.find(
      s => s.word.toLowerCase() === normalized.toLowerCase()
    );

    if (exact) return exact;

    // 2. Coincidencia por related
    const relatedMatch = symbols.find(
      s => s.related?.some(r =>
        r.toLowerCase().includes(normalized.toLowerCase())
      )
    );

    if (relatedMatch) return relatedMatch;

    return null;
  },

  async addPersonalSymbol(word: PersonalWord): Promise<void> {

    const symbols = this.getAllSymbols();
    const normalizedWord = normalizeSystemText(word.word);

    const exists = symbols.find(
      s => s.word.toLowerCase() === normalizedWord.toLowerCase()
    );

    const newEntry: SymbolEntry = {
      ...word,
      word: normalizedWord,
      metaphors: [],
      isConfirmedByAuthor: true,
      isIntimate: word.isPrivate ?? true,
      type: word.origin === 'personal' ? 'personal' : 'emergente'
    };

    if (exists) {
      symbols[symbols.indexOf(exists)] = {
        ...exists,
        userValidation: word.definicionPersonal || word.meaning,
        isConfirmedByAuthor: true,
        type: 'personal'
      };
    } else {
      symbols.unshift(newEntry);
    }

    this.saveSymbols(symbols);
  }
};
