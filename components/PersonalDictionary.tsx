import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X, Sparkles, Book } from 'lucide-react';
import { PersonalWord, SymbolicCategory } from '../types';
import { normalizeSpanishText, normalizeSystemText } from '../utils/linguisticNormalizer';

interface PersonalDictionaryProps {
  words: PersonalWord[];
  onAdd: (word: PersonalWord) => void;
  onDelete: (id: string) => void;
}

const PersonalDictionary: React.FC<PersonalDictionaryProps> = ({ words, onAdd, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [newWord, setNewWord] = useState({ 
    word: '', 
    category: 'Naturaleza' as SymbolicCategory, 
    definicionPersonal: '' 
  });

  const categories: SymbolicCategory[] = [
    'Naturaleza', 'Objeto', 'Emoción', 'Memoria', 'Vínculo', 
    'Emergente', 'Protección', 'Lenguaje', 'Ancestros', 'Camino', 
    'Transformación', 'Límite', 'Tiempo', 'Orden', 'Equilibrio', 
    'Cuerpo', 'Legado', 'Tierra'
  ];

  const filtered = useMemo(() => {
    return words.filter((w) =>
      w.word.toLowerCase().includes(search.toLowerCase()) ||
      (w.category && w.category.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, words]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.word || !newWord.definicionPersonal) return;
    
    onAdd({
      id: Date.now().toString(),
      word: newWord.word,
      category: newWord.category,
      origin: 'personal',
      createdAt: new Date().toISOString(),
      definicionPersonal: newWord.definicionPersonal,
      isPrivate: false
    });
    
    setNewWord({ word: '', category: 'Naturaleza', definicionPersonal: '' });
    setIsAdding(false);
  };

  return (
    <div className="animate-fade-in space-y-16 max-w-7xl mx-auto px-6 pb-40">
      <header className="text-center space-y-6 pt-4">
        <div className="w-12 h-12 bg-azul-noche text-dorado-suave rounded-full flex items-center justify-center mx-auto shadow-sm">
          <Book size={20} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-azul-noche serif-font italic tracking-tight">
            Diccionario de símbolos personales
          </h2>
          <p className="text-azul-noche/40 serif-font italic text-lg max-w-2xl mx-auto leading-relaxed">
            {normalizeSpanishText('"Las palabras son semillas que sembramos en nuestra propia historia para cosechar memoria."')}
          </p>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative group w-full max-w-md">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-dorado-suave/40 group-focus-within:text-verde-salvia transition-colors">
            <Search size={18} />
          </div>
          <input 
            type="text"
            placeholder={normalizeSystemText('Buscar en la memoria simbólica...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/40 backdrop-blur-md border border-dorado-suave/20 rounded-full pl-16 pr-8 py-3.5 focus:outline-none focus:border-verde-salvia transition-all serif-font italic text-base shadow-sm"
          />
        </div>

        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-4 px-10 py-4 bg-azul-noche text-dorado-suave rounded-full text-xs font-bold tracking-wide hover:bg-verde-salvia hover:text-white transition-all shadow-md group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
          <span>{normalizeSystemText('Sembrar palabra')}</span>
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-white p-10 sm:p-12 max-w-2xl mx-auto rounded-[3rem] border border-dorado-suave/20 shadow-2xl relative overflow-hidden texture-grain"
          >
            <div className="absolute top-0 right-0 p-8 text-dorado-suave/5 pointer-events-none">
              <Sparkles size={120} />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-azul-noche/30 italic tracking-wide ml-4">{normalizeSystemText('Nombre del símbolo')}</label>
                <input 
                  type="text" 
                  placeholder={normalizeSystemText('Ej: Puerta, Viento, Raíz...')}
                  value={newWord.word}
                  onChange={(e) => setNewWord({...newWord, word: e.target.value})}
                  className="w-full bg-transparent border-b border-dorado-suave/20 p-4 serif-font italic text-2xl focus:outline-none focus:border-verde-salvia text-azul-noche"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-azul-noche/30 italic tracking-wide ml-4">{normalizeSystemText('Categoría del ser')}</label>
                <select 
                  value={newWord.category}
                  onChange={(e) => setNewWord({...newWord, category: e.target.value as SymbolicCategory})}
                  className="w-full bg-white/60 border border-dorado-suave/10 rounded-full px-6 py-4 text-sm font-medium focus:outline-none focus:border-verde-salvia transition-all cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-azul-noche/30 italic tracking-wide ml-4">{normalizeSystemText('Definición personal (Tu sentir)')}</label>
                <textarea 
                  placeholder={normalizeSpanishText('¿Qué habita en esta palabra para ti?...')}
                  value={newWord.definicionPersonal}
                  onChange={(e) => setNewWord({...newWord, definicionPersonal: e.target.value})}
                  className="w-full bg-white/60 border border-dorado-suave/10 rounded-[2rem] p-8 serif-font italic text-lg focus:outline-none focus:border-verde-salvia h-48 resize-none shadow-inner leading-relaxed"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 py-4 bg-verde-salvia text-white rounded-full font-bold text-xs tracking-wide shadow-md hover:bg-azul-noche transition-colors duration-500">{normalizeSystemText('Inscribir en la memoria')}</button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-10 py-4 text-azul-noche/30 font-bold text-xs tracking-wide hover:text-azul-noche transition-colors duration-500">{normalizeSystemText('Cancelar')}</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-40 text-center border border-dashed border-azul-noche/10 rounded-[3rem] bg-white/20"
          >
            <p className="text-azul-noche/20 serif-font italic text-xl">{normalizeSpanishText('No se han encontrado ecos para esta búsqueda.')}</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map(word => (
              <motion.article 
                layout
                key={word.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-10 bg-white/70 backdrop-blur-sm rounded-[3rem] border border-dorado-suave/10 shadow-sm hover:shadow-xl transition-all duration-700 group texture-grain relative overflow-hidden flex flex-col justify-between min-h-[380px]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-dorado-suave/5 rounded-full -mr-16 -mt-16 group-hover:bg-dorado-suave/10 transition-colors duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-verde-salvia italic tracking-wide">{normalizeSystemText(word.category)}</span>
                      <h4 className="text-2xl font-bold text-azul-noche serif-font italic tracking-tight">{word.word}</h4>
                    </div>
                    <button 
                      onClick={() => onDelete(word.id)} 
                      className="text-azul-noche/5 hover:text-rosa-ceniza p-2 rounded-full transition-all duration-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h5 className="text-[9px] font-bold text-azul-noche/20 italic tracking-wide border-b border-azul-noche/5 pb-1 w-fit">{normalizeSystemText('Definición personal')}</h5>
                      <p className="text-base serif-font italic text-azul-noche/70 leading-relaxed">
                        "{word.definicionPersonal || word.meaning}"
                      </p>
                    </div>

                    {word.resonanciaEmocional && (
                      <div className="space-y-1">
                        <h5 className="text-[9px] font-bold text-dorado-suave/40 italic tracking-wide">{normalizeSystemText('Resonancia')}</h5>
                        <p className="text-xs text-azul-noche/40 serif-font italic leading-relaxed">
                          {word.resonanciaEmocional}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <footer className="mt-8 pt-6 border-t border-azul-noche/5 text-[9px] font-bold text-azul-noche/15 tracking-widest italic text-center relative z-10">
                  {normalizeSystemText(`Sembrado el ${new Date(word.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`)}
                </footer>
              </motion.article>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default PersonalDictionary;