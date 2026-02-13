import React from 'react';
import { motion } from 'framer-motion';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import { Sparkles, ShieldCheck } from 'lucide-react';

const m = motion as any;

interface WelcomeProps {
  isIdentificationView?: boolean;
  onStart?: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ isIdentificationView = false, onStart }) => {
  return (
    <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`text-center ${isIdentificationView ? 'py-4' : 'py-16 mb-8'} px-8 max-w-2xl mx-auto rounded-[3rem] bg-white/60 border border-azul-noche/5 shadow-sm backdrop-blur-md`}
    >
      <div className="space-y-8">
        <header className="space-y-6">
          <div className="w-12 h-12 bg-azul-noche text-dorado-suave rounded-full flex items-center justify-center mx-auto shadow-md border border-dorado-suave/10">
            <Sparkles size={20} strokeWidth={1.5} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-azul-noche serif-font italic tracking-tight">
              {normalizeSystemText('El cuaderno de los sueños')}
            </h1>
            <p className="text-base font-semibold text-dorado-suave italic tracking-wide">
              {normalizeSystemText('Herramienta pedagógica de escritura consciente')}
            </p>
          </div>
        </header>

        <div className="space-y-8">
          <p className="text-lg text-azul-noche/70 serif-font italic leading-relaxed">
            {normalizeSpanishText('Un recinto digital diseñado para que habites tu propia voz, reflexiones sobre tus símbolos y fortalezcas tu capacidad de narrar el mundo.')}
          </p>
          
          <div className="p-6 bg-marfil-cosmico/50 rounded-2xl border border-azul-noche/5 space-y-3">
            <div className="flex items-center justify-center gap-3 text-rosa-ceniza">
              <ShieldCheck size={16} />
              <h4 className="text-[10px] font-bold tracking-wide italic">{normalizeSystemText('Aviso ético y pedagógico')}</h4>
            </div>
            <p className="text-xs text-azul-noche/50 italic serif-font leading-relaxed">
              {normalizeSpanishText('Este espacio no es terapia ni diagnóstico. Es un ejercicio de soberanía narrativa donde tú eres el único dueño del sentido de tu palabra.')}
            </p>
          </div>

          {onStart && !isIdentificationView && (
            <div className="pt-4">
              <button 
                onClick={onStart}
                className="px-12 py-4 bg-azul-noche text-dorado-suave rounded-full font-bold text-xs italic transition-all shadow-lg hover:bg-verde-salvia hover:text-white"
              >
                {normalizeSystemText('Comenzar a escribir')}
              </button>
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
};

export default Welcome;