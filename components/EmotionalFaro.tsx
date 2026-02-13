
import React, { useMemo } from 'react';
import { detectEmotionalClimate, getEmotionalFaro } from '../utils/emotionalLogic';

interface EmotionalFaroProps {
  content: string;
  isActive: boolean;
}

const EmotionalFaro: React.FC<EmotionalFaroProps> = ({ content, isActive }) => {
  const climateMessage = useMemo(() => {
    if (content.length < 20) return null;
    const climate = detectEmotionalClimate(content);
    return getEmotionalFaro(climate);
  }, [content]);

  if (!isActive || !climateMessage) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-32 z-50 animate-fade-in-up w-full max-w-xl px-6">
      <div className="bg-white/90 backdrop-blur-2xl border border-dorado-suave/30 p-8 rounded-[3rem] shadow-2xl flex items-start gap-6 group transition-ritual hover:bg-white">
        <div className="mt-1 w-3 h-3 rounded-full bg-dorado-suave animate-pulse shrink-0 shadow-[0_0_15px_rgba(216,194,122,0.5)]"></div>
        <div className="space-y-2">
          <p className="serif-font italic text-azul-noche/70 text-lg leading-relaxed">
            {climateMessage}
          </p>
          <p className="text-[10px] font-bold text-azul-noche/20 uppercase tracking-widest italic border-t border-azul-noche/5 pt-2 mt-2">
            La Emoción es inteligencia protegiendo la Vida.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmotionalFaro;
