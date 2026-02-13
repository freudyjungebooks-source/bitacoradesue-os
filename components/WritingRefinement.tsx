
import React from 'react';
import { normalizeSpanishText, normalizeSystemText } from '../utils/linguisticNormalizer';

interface WritingRefinementProps {
  original: string;
  distilled?: string; 
  note?: string;
}

const WritingRefinement: React.FC<WritingRefinementProps> = ({ original, distilled, note }) => {
  if (!note && !distilled) return null;

  return (
    <div className="space-y-16 py-10 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h6 className="text-[10px] font-bold text-azul-noche/30 uppercase tracking-widest italic">{normalizeSystemText('mi palabra inicial')}</h6>
          <div className="p-10 bg-white/30 rounded-[3.5rem] border border-white/60 shadow-inner">
            <p className="text-azul-noche/80 serif-font text-lg leading-relaxed italic">
              {original}
            </p>
          </div>
        </div>

        {distilled && (
          <div className="space-y-6">
            <h6 className="text-[10px] font-bold text-verde-salvia uppercase tracking-widest italic">{normalizeSystemText('opción voluntaria')}</h6>
            <div className="p-10 bg-verde-salvia/5 rounded-[3.5rem] border border-verde-salvia/10 shadow-sm group hover:bg-white transition-all duration-1000">
              <p className="text-azul-noche/70 text-lg serif-font italic leading-relaxed">
                "{normalizeSpanishText(distilled)}"
              </p>
              <footer className="mt-8 pt-6 border-t border-verde-salvia/10">
                <p className="text-[11px] font-bold text-dorado-suave tracking-[0.5em] uppercase italic text-center animate-pulse">
                  “Tu voz es la soberana”
                </p>
              </footer>
            </div>
          </div>
        )}
      </div>

      {note && (
        <div className="p-10 bg-marfil-cósmico/40 rounded-[3.5rem] border border-dorado-suave/10 text-center italic text-sm text-azul-noche/50 serif-font">
          {normalizeSpanishText(note)}
        </div>
      )}
    </div>
  );
};

export default WritingRefinement;
