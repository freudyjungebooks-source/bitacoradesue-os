import React, { useState, useEffect } from 'react';
import { DreamEntry, SystemMode } from '../types';
import StudentSovereignText from './StudentSovereignText';
import { safeNormalize, normalizeSpanishText, normalizeSystemText } from '../utils/linguisticNormalizer';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, Heart, Quote, Compass, Book, Shield, Wind, Landmark, Ghost, User, Layers } from 'lucide-react';

// Fix: Using a type-casted alias for motion to bypass environment-specific type errors for motion props.
const m = motion as any;

interface DreamEntryCardProps {
  entry: DreamEntry;
  onDelete: (id: string) => void;
  onUpdate?: (entry: DreamEntry) => void;
  mode?: SystemMode;
}

const DreamEntryCard: React.FC<DreamEntryCardProps> = ({ entry, onDelete }) => {
  const [showAccompaniment, setShowAccompaniment] = useState(false);
  const [activeLevel, setActiveLevel] = useState<number>(1);

  useEffect(() => {
    setShowAccompaniment(false);
    setActiveLevel(1);
  }, [entry.id]);

  const rl = entry.readingLayer;
  if (!entry) return null;

  const levels = [
    { id: 1, label: 'Sentir', icon: Heart },
    { id: 2, label: 'Vínculos', icon: User },
    { id: 3, label: 'Símbolo', icon: Compass },
    { id: 4, label: 'Psique', icon: Book },
    { id: 5, label: 'Integración', icon: Layers }
  ];

  return (
    <m.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 sm:p-10 mb-10 border border-azul-noche/5 shadow-sm relative rounded-xl overflow-hidden group/card"
    >
      <header className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-verde-salvia italic bg-verde-salvia/5 px-3 py-1 rounded-md border border-verde-salvia/10">
              {entry.date || normalizeSystemText('Registro soberano')}
            </span>
            <span className="text-xs font-medium text-azul-noche/40 italic flex items-center gap-1.5">
              <Wind size={10} />
              {safeNormalize(entry.metadata?.writingType)}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-azul-noche serif-font italic tracking-tight">
            {safeNormalize(entry.title || 'Palabra sin título')}
          </h3>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAccompaniment(!showAccompaniment)}
            className={`p-2.5 rounded-lg border transition-all duration-500 ${showAccompaniment ? 'bg-azul-noche text-dorado-suave border-azul-noche' : 'bg-white text-azul-noche/20 border-azul-noche/10 hover:border-dorado-suave/20'}`}
            title={normalizeSystemText('Ver eco pedagógico')}
          >
            <Eye size={18} />
          </button>
          <button 
            onClick={() => onDelete(entry.id)} 
            className="p-2.5 text-azul-noche/10 hover:text-rosa-ceniza transition-all duration-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </header>

      <section className="mb-8 space-y-5">
        <div className="flex items-center gap-2 opacity-30">
          <Quote size={12} className="text-dorado-suave" />
          <h4 className="text-xs font-semibold text-azul-noche italic">{normalizeSystemText('Relato soberano')}</h4>
        </div>
        <StudentSovereignText content={entry.content} />
      </section>

      <AnimatePresence>
        {showAccompaniment && (
          <m.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-azul-noche/5 pt-8 mt-4 overflow-hidden"
          >
            <div className="space-y-8">
              <nav className="flex flex-wrap justify-center gap-4">
                {levels.map(lvl => (
                  <button
                    key={lvl.id}
                    onClick={() => setActiveLevel(lvl.id)}
                    className={`flex items-center gap-2 text-xs font-medium italic px-5 py-2 rounded-full border transition-all duration-500 ${activeLevel === lvl.id ? 'bg-azul-noche text-dorado-suave border-azul-noche' : 'bg-white/60 text-azul-noche/30 border-azul-noche/5 hover:border-dorado-suave/20'}`}
                  >
                    <lvl.icon size={12} />
                    {normalizeSystemText(lvl.label)}
                  </button>
                ))}
              </nav>

              <div className="bg-marfil-cosmico/40 p-6 sm:p-8 rounded-xl border border-azul-noche/5 relative overflow-hidden min-h-[14rem]">
                {rl ? (
                  <m.div 
                    key={activeLevel}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {activeLevel === 1 && (
                      <div className="space-y-4 text-center max-w-2xl mx-auto">
                        <p className="text-base font-medium serif-font italic text-azul-noche/80 leading-relaxed">
                          "{safeNormalize(rl.acogidaHumana || 'Su sentir es recibido con dignidad institucional.')}"
                        </p>
                        <div className="flex justify-center gap-4 pt-2">
                           <span className="text-xs font-semibold text-dorado-suave italic bg-white/60 px-4 py-1.5 rounded-full border border-dorado-suave/10 shadow-sm">
                             {normalizeSystemText(`Clima: ${rl.lecturaSimbolica?.tonoEmocional || 'Sereno'}`)}
                           </span>
                        </div>
                      </div>
                    )}

                    {activeLevel === 2 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-azul-noche/40 italic border-b border-azul-noche/5 pb-1">{normalizeSystemText('Vínculos y memoria sistémica')}</h4>
                        <p className="text-sm serif-font italic text-azul-noche/70 leading-relaxed">
                          {normalizeSpanishText("Su relato evoca hilos de conexión que trascienden lo individual. Resonancia vinculativa detectada:")}
                        </p>
                        <div className="p-5 bg-white/60 rounded-lg border border-azul-noche/5 shadow-inner italic text-sm text-azul-noche/60">
                          {safeNormalize(rl.lecturaSimbolica?.resonancia)}
                        </div>
                      </div>
                    )}

                    {activeLevel === 3 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-azul-noche/40 italic border-b border-azul-noche/5 pb-1">{normalizeSystemText('Asistente cultural de símbolos')}</h4>
                        <p className="text-sm serif-font italic text-azul-noche/70 leading-relaxed">
                          {normalizeSpanishText("Imágenes que habitan el inconsciente colectivo y su cultura:")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(rl.lecturaSimbolica?.símbolosDetectados || []).map((s, i) => (
                            <span key={i} className="text-xs font-semibold text-verde-salvia border border-verde-salvia/20 px-4 py-1.5 rounded-full italic bg-white shadow-sm">
                              {s}
                            </span>
                          ))}
                        </div>
                        <p className="text-[10px] text-azul-noche/30 italic pt-2">{normalizeSpanishText('Use la lupa para profundizar en estos ecos.')}</p>
                      </div>
                    )}

                    {activeLevel === 4 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-azul-noche/40 italic border-b border-azul-noche/5 pb-1">{normalizeSystemText('Marco psicológico y reflexivo')}</h4>
                        <p className="text-sm serif-font italic text-azul-noche/70 leading-relaxed">
                          {normalizeSpanishText("Perspectivas de la psicología profunda integradas como herramientas de autoconocimiento:")}
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                           {rl.integracionCurricular?.competencias.map((c, i) => (
                             <div key={i} className="text-xs font-semibold text-azul-noche/50 flex gap-3 italic items-center">
                               <div className="w-1 h-1 rounded-full bg-dorado-suave opacity-40"></div> {c}
                             </div>
                           ))}
                        </div>
                      </div>
                    )}

                    {activeLevel === 5 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h5 className="text-[10px] font-bold text-azul-noche/30 italic tracking-wide">{normalizeSystemText('Estándares del Lenguaje')}</h5>
                            <ul className="space-y-2">
                              {rl.integracionCurricular?.estandares.map((s, i) => (
                                <li key={i} className="text-xs serif-font italic text-azul-noche/60 leading-relaxed flex gap-2">
                                  <span className="text-verde-salvia opacity-60">✓</span> {safeNormalize(s)}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h5 className="text-[10px] font-bold text-azul-noche/30 italic tracking-wide">{normalizeSystemText('Derechos Básicos (DBA)')}</h5>
                            <ul className="space-y-2">
                              {rl.integracionCurricular?.dba.map((d, i) => (
                                <li key={i} className="text-xs serif-font italic text-azul-noche/60 leading-relaxed flex gap-2">
                                  <span className="text-dorado-suave opacity-60">◈</span> {safeNormalize(d)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </m.div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 py-8 opacity-20">
                    <div className="w-8 h-8 border-2 border-dorado-suave/30 border-t-dorado-suave rounded-full animate-spin"></div>
                    <p className="text-sm serif-font italic text-azul-noche">{normalizeSystemText('Acompañando la palabra...')}</p>
                  </div>
                )}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.article>
  );
};

export default DreamEntryCard;