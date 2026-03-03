import React, { useState, useEffect } from 'react';
import { symbolDictionaryService } from '../services/symbolDictionaryService';
import { PersonalWord, AgeGroup, SymbolicCategory } from '../types';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Compass, Fingerprint } from 'lucide-react';

const m = motion as any;

interface SymbolSearchProps {
  onClose: () => void;
  onAddWord: (word: PersonalWord) => void;
  ageGroup?: AgeGroup;
}

const SymbolSearch: React.FC<SymbolSearchProps> = ({
  onClose,
  onAddWord,
  ageGroup = 'jóvenes'
}) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    symbolDictionaryService.initializeIfEmpty();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const res = symbolDictionaryService.searchSymbol(query.trim());
      setResult(res || null);
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-azul-noche/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <m.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-marfil-cosmico rounded-2xl w-full max-w-2xl p-8 sm:p-12 shadow-2xl border border-azul-noche/5 overflow-y-auto max-h-[90vh] no-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-azul-noche/20 hover:text-azul-noche p-2 transition-all"
        >
          ✕
        </button>

        <header className="text-center mb-10 space-y-2">
          <div className="flex justify-center mb-4 text-dorado-suave opacity-60">
            <Search size={24} strokeWidth={1.5} />
          </div>

          <h3 className="text-xl font-semibold text-azul-noche serif-font italic tracking-tight">
            {normalizeSystemText('Exploración simbólica')}
          </h3>

          <p className="text-sm font-medium text-dorado-suave italic">
            Diccionario simbólico cultural y pedagógico
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

            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dorado-suave hover:scale-105 transition-transform p-2"
            >
              {isLoading ? (
                <div className="animate-spin text-sm">✧</div>
              ) : (
                <Search size={20} />
              )}
            </button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {result && (
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="p-6 bg-white/60 rounded-xl border border-azul-noche/5 space-y-3">
                  <div className="flex items-center gap-2 text-verde-salvia opacity-80">
                    <BookOpen size={16} />
                    <h4 className="text-xs font-semibold italic">
                      Perspectiva cultural
                    </h4>
                  </div>

                  <p className="text-sm text-azul-noche/70 leading-relaxed italic serif-font">
                    {normalizeSpanishText(result.definicionAcademica || result.meaning)}
                  </p>
                </div>

                <div className="p-6 bg-marfil-cosmico/50 rounded-xl border border-dorado-suave/10 space-y-3">
                  <div className="flex items-center gap-2 text-dorado-suave">
                    <Fingerprint size={16} />
                    <h4 className="text-xs font-semibold italic">
                      Resonancia simbólica
                    </h4>
                  </div>

                  <p className="text-sm text-azul-noche/80 serif-font italic leading-relaxed">
                    {normalizeSpanishText(result.resonanciaEmocional || '')}
                  </p>
                </div>
              </div>

              {result.reflexiveClosure && (
                <div className="p-6 bg-azul-noche/5 rounded-xl border border-azul-noche/5 space-y-4">
                  <div className="flex items-center gap-2 text-azul-noche/40">
                    <Compass size={16} />
                    <h4 className="text-xs font-semibold italic">
                      Cierre reflexivo
                    </h4>
                  </div>

                  <p className="text-sm text-azul-noche/70 serif-font italic leading-relaxed">
                    {normalizeSpanishText(result.reflexiveClosure)}
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  onAddWord({
                    id: Date.now().toString(),
                    word: result.word,
                    meaning: result.meaning,
                    definicionPersonal: '',
                    definicionAcademica: result.definicionAcademica,
                    category: result.category as SymbolicCategory,
                    origin: 'personal',
                    resonanciaEmocional: result.resonanciaEmocional,
                    createdAt: new Date().toISOString()
                  });

                  onClose();
                }}
                className="w-full py-4 bg-azul-noche text-dorado-suave rounded-full text-sm font-bold italic transition-all shadow-md hover:bg-verde-salvia hover:text-white"
              >
                {normalizeSystemText('Guardar en mi diccionario')}
              </button>

            </m.div>
          )}
        </AnimatePresence>

      </m.div>
    </div>
  );
};

export default SymbolSearch;
