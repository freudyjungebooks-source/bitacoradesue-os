import React from 'react';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';

interface Resonance {
  type: string;
  message: string;
  pedagogicalRoot: string;
}

interface LinguisticResonanceProps {
  content: string;
  isActive: boolean;
  environmentalNote?: string;
  healingWord?: string;
}

const LinguisticResonance: React.FC<LinguisticResonanceProps> = ({ content, isActive, environmentalNote, healingWord }) => {
  if (!isActive) return null;

  const getResonances = (text: string): Resonance[] => {
    const list: Resonance[] = [];
    
    if (healingWord) {
      list.push({
        type: 'contención',
        message: healingWord,
        pedagogicalRoot: "Tus emociones son válidas y tienen un lugar aquí."
      });
    }

    if (environmentalNote) {
      list.push({
        type: 'territorio',
        message: environmentalNote,
        pedagogicalRoot: "Cuidar la palabra es la primera forma de cuidar la vida."
      });
    } else {
      list.push({
        type: 'ritmo',
        message: "Tu palabra fluye con un tiempo propio. Escuchar su ritmo es aprender a habitar el presente.",
        pedagogicalRoot: "La puntuación es el latido de tu voz."
      });
    }

    list.push({
      type: 'ancestral',
      message: "Al escribir, dejas un rastro de tu existencia en el mundo, tal como lo hacían los antiguos.",
      pedagogicalRoot: "Escribir es un acto de presencia ética."
    });

    return list.slice(0, 3);
  };

  const resonances = getResonances(content);

  return (
    <div className="mt-16 space-y-12 animate-fade-in py-12 border-t border-dorado-suave/10">
      <header className="flex items-center gap-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-dorado-suave/30"></div>
        <h5 className="text-[11px] font-bold tracking-[0.2em] text-azul-noche/40 italic">
          {normalizeSystemText('eco del Relato')}
        </h5>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-dorado-suave/30"></div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {resonances.map((res, i) => (
          <div key={i} className="group bg-white/40 p-10 rounded-[4rem] border border-white/60 hover:shadow-xl transition-ritual">
            <div className="space-y-6">
              <span className="text-3xl block opacity-40 group-hover:opacity-100 transition-opacity text-dorado-suave">
                {res.type === 'ritmo' ? '༄' : res.type === 'territorio' ? '🌱' : res.type === 'contención' ? '🤍' : '⌬'}
              </span>
              <h6 className="text-[10px] font-bold text-azul-noche/30 tracking-widest italic">{normalizeSystemText(res.type)}</h6>
              <p className="text-lg serif-font italic text-azul-noche/70 leading-relaxed">
                {normalizeSpanishText(res.message)}
              </p>
              <footer className="pt-4 border-t border-azul-noche/5">
                <p className="text-[10px] font-bold tracking-tight text-verde-salvia/70 italic">
                  {normalizeSpanishText(res.pedagogicalRoot)}
                </p>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinguisticResonance;