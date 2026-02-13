import React, { useState } from 'react';
import { searchSymbolMeaning } from '../services/geminiService';
import { PersonalWord, AgeGroup, ClassicalSymbolMeaning, SymbolicCategory } from '../types';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Compass, Fingerprint } from 'lucide-react';

// Fix: Using a type-casted alias for motion to bypass environment-specific type errors for motion props.
const m = motion as any;

interface SymbolSearchProps {
  onClose: () => void;
  onAddWord: (word: PersonalWord) => void;
  ageGroup?: AgeGroup;
}

const SymbolSearch: React.FC<SymbolSearchProps> = ({ onClose, onAddWord, ageGroup = 'jóvenes' }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ClassicalSymbolMeaning | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const res = await searchSymbolMeaning(query);
      setResult(res);
    } catch (err) { 
      console.error(err); 
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-azul-noche/80 backdrop-blur-sm" onClick={onClose}></div>
      <m.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-marfil-cosmico rounded-2xl w-full max-w-2xl p-8 sm:p-12 shadow-2xl border border-azul-noche/5 overflow-y-auto max-h-[90vh] no-scrollbar"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-azul-noche/20 hover:text-azul-noche p-2 transition-all">✕</button>

        <header className="text-center mb-10 space-y-2">
          <div className="flex justify-center mb-4 text-dorado-suave opacity-60">
            <Search size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-azul-noche serif-font italic tracking-tight">
            {normalizeSystemText('Exploración simbólica')}
          </h3>
          <p className="text-sm font-medium text-dorado-suave italic">
            El símbolo como puente entre culturas y conocimiento
          </p>
        </header>

        <form onSubmit={handleSearch} className="mb-10 max-w-md mx-auto">
          <div className="relative">
            <input 
              type="text" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)}
              placeholder={normalizeSystemText('Nombra la imagen o símbolo...')}
              className="w-full bg-white/60 border border-azul-noche/5 rounded-full px-6 py-4 focus:outline-none focus:border-verde-salvia serif-font italic text-base transition-all shadow-sm"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-dorado-suave hover:scale-105 transition-transform p-2">
              {isLoading ? <div className="animate-spin text-sm">✧</div> : <Search size={20} />}
            </button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {result && (
            <m.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/60 rounded-xl border border-azul-noche/5 space-y-3">
                  <div className="flex items-center gap-2 text-verde-salvia opacity-80">
                    <BookOpen size={16} />
                    <h4 className="text-xs font-semibold italic">Perspectiva cultural</h4>
                  </div>
                  <p className="text-sm text-azul-noche/70 leading-relaxed italic serif-font">
                    {normalizeSpanishText(result.mainDefinition)}
                  </p>
                </div>
                
                <div className="p-6 bg-marfil-cosmico/50 rounded-xl border border-dorado-suave/10 space-y-3">
                  <div className="flex items-center gap-2 text-dorado-suave">
                    <Fingerprint size={16} />
                    <h4 className="text-xs font-semibold italic">Perspectiva simbólica</h4>
                  </div>
                  <p className="text-sm text-azul-noche/80 serif-font italic leading-relaxed">
                    {normalizeSpanishText(result.emotionalResonance)}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-azul-noche/5 rounded-xl border border-azul-noche/5 space-y-4">
                <div className="flex items-center gap-2 text-azul-noche/40">
                  <Compass size={16} />
                  <h4 className="text-xs font-semibold italic">Perspectiva lingüística</h4>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-azul-noche/70 serif-font italic leading-relaxed">
                    {normalizeSpanishText(result.reflexiveClosure)}
                  </p>
                  <ul className="grid grid-cols-1 gap-3">
                    {result.guidingQuestions.map((q, i) => (
                      <li key={i} className="text-xs text-azul-noche/50 serif-font italic flex gap-3">
                        <span className="text-dorado-suave opacity-40">✦</span> {normalizeSpanishText(q)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button 
                onClick={() => {
                  onAddWord({
                    id: Date.now().toString(),
                    word: result.symbol,
                    meaning: result.mainDefinition,
                    definicionPersonal: "",
                    definicionAcademica: result.mainDefinition,
                    category: (result.category || 'Emergente') as SymbolicCategory,
                    origin: 'sueño',
                    resonanciaEmocional: result.emotionalResonance,
                    usoPedagogico: 'Inscripción voluntaria',
                    pedagogicalUse: 'Inscripción voluntaria',
                    classicalData: result,
                    createdAt: new Date().toISOString()
                  });
                  onClose();
                }}
                className="w-full py-4 bg-azul-noche text-dorado-suave rounded-full text-sm font-bold italic transition-all shadow-md hover:bg-verde-salvia hover:text-white"
              >
                {normalizeSystemText('Sembrar en mi memoria')}
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  );
};

export default SymbolSearch;