
import { PersonalWord, ClassicalSymbolMeaning, AgeGroup, SymbolicCategory } from '../types';
import { normalizeSpanishText, normalizeSystemText } from '../utils/linguisticNormalizer';

export interface SymbolEntry extends PersonalWord {
  metaphors: string[];
  userValidation?: string;
  isConfirmedByAuthor: boolean;
  type: 'clásico' | 'personal' | 'emergente';
  isIntimate?: boolean;
}

const STORAGE_KEY = 'bitacora_diccionario_v6_consolidated';

/**
 * REGLAS DE COMPORTAMIENTO ÉTICO DEL DICCIONARIO (CORE V2)
 * 1. NO INTERPRETACIÓN: El sistema ofrece ecos culturales, no verdades psicológicas.
 * 2. SOBERANÍA: El usuario puede sobreescribir cualquier significado clásico con su vivencia.
 * 3. PEDAGOGÍA ACTIVA: Se integran los ciclos vitales y competencias del lenguaje.
 */
export const symbolDictionaryService = {
  async initializeIfEmpty(): Promise<void> {
    const current = this.getAllSymbols();
    if (current.length === 0) {
      try {
        const response = await fetch('data/classicalSymbols.json');
        if (!response.ok) throw new Error("No se pudo cargar la semilla clásica.");
        const classics: any[] = await response.json();
        
        const initialEntries: SymbolEntry[] = classics.map(s => ({
          id: `classic-${s.symbol.toLowerCase()}`,
          word: normalizeSystemText(s.symbol),
          meaning: s.mainDefinition,
          category: s.category as SymbolicCategory,
          origin: 'clásico',
          type: 'clásico',
          isIntimate: false,
          classicalData: {
            symbol: s.symbol,
            category: s.category,
            mainDefinition: s.mainDefinition,
            emotionalResonance: s.emotionalResonance,
            pedagogicalCycles: s.pedagogicalCycles,
            languageCompetencies: s.languageCompetencies,
            reflexiveClosure: s.reflexiveClosure,
            guidingQuestions: s.guidingQuestions,
            isEmergent: s.isEmergent || false
          },
          definicionPersonal: "",
          definicionAcademica: s.mainDefinition,
          resonanciaEmocional: s.emotionalResonance,
          usoPedagogico: s.pedagogicalCycles.primaria, // Default for mapping
          pedagogicalUse: s.pedagogicalCycles.primaria,
          languageCompetencies: s.languageCompetencies,
          reflexiveClosure: s.reflexiveClosure,
          pedagogicalCycles: s.pedagogicalCycles,
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
    } catch { return []; }
  },

  saveSymbols(symbols: SymbolEntry[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(symbols));
  },

  async addPersonalSymbol(word: PersonalWord): Promise<void> {
    const symbols = this.getAllSymbols();
    const normalizedWord = normalizeSystemText(word.word);
    const exists = symbols.find(s => s.word.toLowerCase() === normalizedWord.toLowerCase());
    
    const newEntry: SymbolEntry = {
      ...word,
      word: normalizedWord,
      metaphors: [],
      isConfirmedByAuthor: true,
      isIntimate: word.isPrivate ?? true,
      type: word.origin === 'personal' ? 'personal' : (word.origin === 'emergencia' ? 'emergente' : 'clásico')
    };

    if (exists) {
      symbols[symbols.indexOf(exists)] = { 
        ...exists, 
        userValidation: word.definicionPersonal || word.meaning, 
        isConfirmedByAuthor: true, 
        isIntimate: word.isPrivate,
        type: 'personal' 
      };
    } else {
      symbols.unshift(newEntry);
    }
    
    this.saveSymbols(symbols);
  }
};
