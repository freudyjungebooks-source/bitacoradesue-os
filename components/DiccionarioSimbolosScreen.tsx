import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, GraduationCap, Heart } from 'lucide-react';
import { PersonalWord, GradeLevel, SymbolicCategory } from '../types';
import { symbolDictionaryService } from '../services/symbolDictionaryService';
import { normalizeSpanishText, normalizeSystemText } from '../utils/linguisticNormalizer';

// Fix: Using a type-casted alias for motion to bypass environment-specific type errors for motion props.
const m = motion as any;

const pedagogicalHints: Record<GradeLevel, { focus: string; guidance: string }> = {
  'Preescolar': {
    focus: 'El asombro y la imagen protectora.',
    guidance: 'En esta etapa, los símbolos son amigos que nos cuidan. Explora imágenes de animales y naturaleza que te den seguridad.'
  },
  'Primero – Segundo': {
    focus: 'La sonoridad y el nombre de las cosas.',
    guidance: 'Cada letra tiene un alma. Busca palabras que suenen como tus sueños y descubre cómo se escriben en tu bitácora.'
  },
  'Tercero – Cuarto': {
    focus: 'El misterio y la autonomía.',
    guidance: 'Usa la lupa simbólica para abrir puertas. Los objetos cotidianos pueden ser llaves para entender lo que sientes.'
  },
  'Quinto': {
    focus: 'El vínculo y el diálogo.',
    guidance: 'Navega símbolos que hablen de puentes y caminos. ¿Cómo se conecta tu historia con la de los demás?'
  },
  'Sexto – Séptimo': {
    focus: 'La transformación y la metáfora.',
    guidance: 'Es tiempo de metamorfosis. Busca símbolos de viento y cambio para nombrar la nueva voz que nace en ti.'
  },
  'Octavo – Noveno': {
    focus: 'El desarrollo del pensamiento crítico.',
    guidance: 'Encuentra en la montaña la fuerza de tu carácter y en el espejo la verdad de tu propia sombra.'
  },
  'Décimo – Undécimo': {
    focus: 'El legado y el proyecto de vida.',
    guidance: 'Tu palabra es un hilo que teje el futuro. Busca símbolos de compromiso ético y trascendencia vital.'
  },
  'Adultos': {
    focus: 'La memoria profunda y el sentido.',
    guidance: 'Habita el símbolo como un espacio de sabiduría decantada. Relee tu historia a la luz de los arquetipos universales.'
  }
};

const grades: GradeLevel[] = [
  'Preescolar', 'Primero – Segundo', 'Tercero – Cuarto', 'Quinto',
  'Sexto – Séptimo', 'Octavo – Noveno', 'Décimo – Undécimo', 'Adultos'
];

const GradeSelector: React.FC<{ value: GradeLevel; onChange: (g: GradeLevel) => void }> = ({ value, onChange }) => {
  return (
    <div className="space-y-6 mb-10">
      <div className="flex flex-wrap justify-center gap-2">
        {grades.map((g) => (
          <button
            key={g}
            onClick={() => onChange(g)}
            className={`px-4 py-2 rounded-full text-xs font-medium italic transition-all border ${
              value === g 
                ? 'bg-azul-noche text-dorado-suave border-azul-noche shadow-md' 
                : 'bg-white/40 text-azul-noche/30 border-azul-noche/5 hover:border-dorado-suave/30'
            }`}
          >
            {normalizeSystemText(g)}
          </button>
        ))}
      </div>
      
      <m.div 
        key={value}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto p-6 bg-verde-salvia/5 rounded-xl border border-verde-salvia/10 flex gap-4 items-start shadow-sm"
      >
        <div className="p-2 bg-verde-salvia/10 rounded-full text-verde-salvia shrink-0">
          <GraduationCap size={16} />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-verde-salvia italic">
            {normalizeSystemText(`Enfoque: ${pedagogicalHints[value].focus}`)}
          </h4>
          <p className="text-sm serif-font italic text-azul-noche/70 leading-relaxed">
            {normalizeSpanishText(pedagogicalHints[value].guidance)}
          </p>
        </div>
      </m.div>
    </div>
  );
};

const SymbolCard: React.FC<{ word: PersonalWord; selectedGrade: GradeLevel }> = ({ word, selectedGrade }) => {
  const getCycleGuidance = () => {
    if (!word.pedagogicalCycles) return word.usoPedagogico || word.pedagogicalUse;
    switch(selectedGrade) {
      case 'Preescolar': return word.pedagogicalCycles.preescolar;
      case 'Primero – Segundo': 
      case 'Tercero – Cuarto':
      case 'Quinto': return word.pedagogicalCycles.primaria;
      case 'Sexto – Séptimo':
      case 'Octavo – Noveno': return word.pedagogicalCycles.secundaria;
      case 'Décimo – Undécimo': return word.pedagogicalCycles.media;
      case 'Adultos': return word.pedagogicalCycles.adultos;
      default: return word.pedagogicalCycles.primaria;
    }
  };

  return (
    <m.article
      layout
      className="bg-white rounded-xl p-6 border border-dorado-suave/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[420px]"
    >
      <div className="space-y-4">
        <header className="space-y-1">
          <span className="text-xs font-medium text-verde-salvia italic block">
            {normalizeSystemText(word.category || 'Arquetipo')}
          </span>
          <h3 className="text-xl font-semibold text-azul-noche serif-font italic leading-tight">
            {normalizeSpanishText(word.word)}
          </h3>
        </header>

        <div className="space-y-4">
          <p className="text-base serif-font italic text-azul-noche/80 leading-relaxed">
            {normalizeSpanishText(word.meaning || word.definicionPersonal || 'Un símbolo que aguarda ser nombrado.')}
          </p>
          
          <div className="space-y-3">
            {word.resonanciaEmocional && (
              <div className="p-3 bg-rosa-ceniza/5 rounded-lg border border-rosa-ceniza/10 flex gap-3">
                <Heart size={14} className="text-rosa-ceniza shrink-0 mt-0.5" />
                <p className="text-xs text-azul-noche/60 serif-font italic leading-snug">{normalizeSpanishText(word.resonanciaEmocional)}</p>
              </div>
            )}
            <div className="p-3 bg-azul-noche/5 rounded-lg border border-azul-noche/5 flex gap-3">
              <GraduationCap size={14} className="text-verde-salvia shrink-0 mt-0.5" />
              <p className="text-xs text-azul-noche/60 serif-font italic leading-snug">{normalizeSpanishText(getCycleGuidance() || 'Práctica reflexiva.')}</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-6 pt-4 border-t border-azul-noche/5 text-center">
        <p className="text-xs font-medium text-azul-noche/20 italic tracking-wide">
          Bitácora de sueños
        </p>
      </footer>
    </m.article>
  );
};

export default function DiccionarioSimbolosScreen() {
  const [grade, setGrade] = useState<GradeLevel>('Sexto – Séptimo');
  const [search, setSearch] = useState('');
  const [words, setWords] = useState<PersonalWord[]>([]);

  useEffect(() => {
    symbolDictionaryService.initializeIfEmpty().then(() => {
      setWords(symbolDictionaryService.getAllSymbols());
    });
  }, []);

  const filtered = useMemo(() => {
    return words.filter((w) => {
      const matchesSearch = w.word.toLowerCase().includes(search.toLowerCase()) ||
                            (w.category && w.category.toLowerCase().includes(search.toLowerCase()));
      return matchesSearch;
    });
  }, [search, words]);

  return (
    <div className="animate-fade-in space-y-10 max-w-6xl mx-auto px-6 pb-32 pt-4">
      <header className="text-center space-y-3">
        <div className="w-10 h-10 bg-azul-noche text-dorado-suave rounded-full flex items-center justify-center mx-auto shadow-sm">
          <Book size={18} />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-azul-noche serif-font italic tracking-tight">
            {normalizeSystemText('Diccionario de símbolos')}
          </h1>
          <p className="text-base text-azul-noche/40 serif-font italic max-w-xl mx-auto">
            {normalizeSpanishText("Cada símbolo es una semilla de sentido. Selecciona tu grado para recibir orientación.")}
          </p>
        </div>
      </header>

      <div className="space-y-6">
        <GradeSelector value={grade} onChange={setGrade} />
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dorado-suave/40" size={16} />
            <input
              placeholder={normalizeSystemText('Buscar esencia simbólica...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/60 border border-azul-noche/5 rounded-full pl-10 pr-6 py-2.5 focus:outline-none focus:border-verde-salvia transition-all serif-font italic text-base shadow-sm"
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center border border-dashed border-azul-noche/10 rounded-xl bg-white/20">
             <p className="text-azul-noche/30 serif-font italic text-lg">No hay ecos para esta búsqueda en el archivo.</p>
          </m.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((w) => (
              <SymbolCard key={w.id} word={w} selectedGrade={grade} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}