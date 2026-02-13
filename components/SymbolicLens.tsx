import React, { useState, useEffect } from 'react';
import { searchSymbolMeaning } from '../services/geminiService';
import { ClassicalSymbolMeaning, PersonalWord, SymbolicCategory } from '../types';
import { normalizeSpanishText, normalizeSystemText } from '../utils/linguisticNormalizer';
import { Search, X, Check, Sprout } from 'lucide-react';

interface SymbolicLensProps {
  onAddWordToDictionary?: (word: PersonalWord) => void;
}

const SymbolicLens: React.FC<SymbolicLensProps> = ({ onAddWordToDictionary }) => {
  const [position, setPosition] = useState<{ x: number, y: number } | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [meaning, setMeaning] = useState<ClassicalSymbolMeaning | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 2 && text.length < 50) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();
        
        if (rect) {
          setSelectedText(text);
          setPosition({
            x: rect.left + window.scrollX,
            y: rect.bottom + window.scrollY + 15
          });
          setMeaning(null);
          setIsSaved(false);
        }
      } else {
        if (!meaning) setPosition(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [meaning]);

  const exploreSymbol = async () => {
    setIsLoading(true);
    try {
      const result = await searchSymbolMeaning(selectedText);
      setMeaning(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (meaning && onAddWordToDictionary) {
      const newWord: PersonalWord = {
        id: Date.now().toString(),
        word: normalizeSpanishText(meaning.symbol),
        meaning: meaning.mainDefinition,
        definicionPersonal: meaning.mainDefinition,
        category: (meaning.category || 'Emergente') as SymbolicCategory,
        origin: meaning.isEmergent ? 'emergencia' : 'clásico',
        resonanciaEmocional: meaning.emotionalResonance,
        usoPedagogico: meaning.pedagogicalCycles.primaria,
        pedagogicalUse: meaning.pedagogicalCycles.primaria,
        classicalData: meaning,
        createdAt: new Date().toLocaleDateString('es-ES')
      };
      onAddWordToDictionary(newWord);
      setIsSaved(true);
      setTimeout(() => setPosition(null), 2500);
    }
  };

  if (!position) return null;

  return (
    <div 
      className="absolute z-[400] animate-fade-in-up"
      style={{ top: position.y, left: Math.min(position.x, window.innerWidth - 420) }}
    >
      <div className="bg-white/98 backdrop-blur-3xl border border-dorado-suave/30 rounded-[2.5rem] shadow-2xl p-8 w-[22rem] texture-grain relative">
        {!meaning ? (
          <button 
            onClick={exploreSymbol}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-4 py-4 bg-azul-noche text-dorado-suave rounded-full hover:bg-verde-salvia transition-all duration-700 shadow-xl"
          >
            {isLoading ? <div className="animate-spin text-sm">✧</div> : <Search size={18} />}
            <span className="text-xs font-bold italic tracking-wide">
              {isLoading ? normalizeSystemText('Consultando ecos...') : normalizeSystemText(`Explorar "${selectedText}"`)}
            </span>
          </button>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <header className="border-b border-azul-noche/5 pb-3">
              <h4 className="text-azul-noche font-bold serif-font italic text-lg leading-tight">{meaning.symbol}</h4>
              <p className="text-[10px] font-bold text-verde-salvia italic tracking-wide mt-1">{normalizeSystemText(meaning.category)}</p>
            </header>
            
            <div className="space-y-4">
              <p className="text-sm serif-font italic text-azul-noche/70 leading-relaxed">
                {meaning.guidingQuestions[0]}
              </p>
            </div>

            <footer className="pt-4 flex gap-3">
              <button 
                onClick={handleSave}
                className={`flex-1 py-3 rounded-full border transition-all duration-700 flex items-center justify-center gap-2 text-[10px] font-bold tracking-wide ${
                  isSaved ? 'bg-verde-salvia text-white border-verde-salvia' : 'bg-verde-salvia/5 text-verde-salvia border-verde-salvia/20 hover:bg-verde-salvia hover:text-white'
                }`}
              >
                {isSaved ? <Check size={12} /> : <Sprout size={12} />}
                <span>{isSaved ? normalizeSystemText('Guardado') : normalizeSystemText('Sembrar')}</span>
              </button>
              <button 
                onClick={() => setPosition(null)} 
                className="p-3 text-azul-noche/20 hover:text-azul-noche transition-colors duration-300"
              >
                <X size={18} />
              </button>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymbolicLens;