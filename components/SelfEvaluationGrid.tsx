import React, { useState } from 'react';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import { motion } from 'framer-motion';

interface EvaluationCriteria {
  estetica: number;
  dedicacion: number;
  creatividad: number;
  caligrafia: number;
  redaccion: number;
}

interface SelfEvaluationGridProps {
  onComplete: (total: number, criteria: EvaluationCriteria) => void;
}

const SelfEvaluationGrid: React.FC<SelfEvaluationGridProps> = ({ onComplete }) => {
  const [criteria, setCriteria] = useState<EvaluationCriteria>({
    estetica: 1,
    dedicacion: 1,
    creatividad: 1,
    caligrafia: 1,
    redaccion: 1
  });

  const updateCriteria = (key: keyof EvaluationCriteria, value: number) => {
    setCriteria(prev => ({ ...prev, [key]: value }));
  };

  const calculateTotal = () => {
    const sum = criteria.estetica + criteria.dedicacion + criteria.creatividad + criteria.caligrafia + criteria.redaccion;
    return sum / 5;
  };

  const labels = [
    { id: 'estetica', title: 'Estética y organización', desc: 'Diseño ordenado, uso consciente del color y márgenes.' },
    { id: 'dedicacion', title: 'Dedicación y riqueza', desc: 'Relación profunda entre dibujo y texto explicativo.' },
    { id: 'creatividad', title: 'Creatividad y originalidad', desc: 'Creación propia, no copia literal de otros símbolos.' },
    { id: 'caligrafia', title: 'Caligrafía y ortografía', desc: 'Letra legible y uso correcto de normas gramaticales.' },
    { id: 'redaccion', title: 'Redacción y calidad', desc: 'Claridad, precisión léxica y coherencia interna.' }
  ];

  return (
    <div className="p-8 sm:p-12 bg-white/80 rounded-[3rem] border border-dorado-suave/20 shadow-xl space-y-12 animate-fade-in relative overflow-hidden texture-grain">
      <header className="text-center space-y-4">
        <h4 className="text-2xl font-bold text-azul-noche serif-font italic tracking-tight">{normalizeSystemText('Autoevaluación consciente')}</h4>
        <p className="text-sm text-azul-noche/40 italic serif-font">{normalizeSpanishText('Valora tu proceso de 1 a 5 con honestidad y respeto a tu palabra.')}</p>
        <div className="w-16 h-px bg-dorado-suave/20 mx-auto"></div>
      </header>

      <div className="space-y-10">
        {labels.map(item => (
          <div key={item.id} className="space-y-4 group">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-azul-noche italic tracking-wide group-hover:text-verde-salvia transition-colors duration-500">{normalizeSystemText(item.title)}</h5>
                <p className="text-[10px] text-azul-noche/30 italic">{normalizeSpanishText(item.desc)}</p>
              </div>
              <span className="text-2xl font-bold text-dorado-suave serif-font">{criteria[item.id as keyof EvaluationCriteria]}</span>
            </div>
            <input 
              type="range" min="1" max="5" step="0.5" 
              value={criteria[item.id as keyof EvaluationCriteria]} 
              onChange={(e) => updateCriteria(item.id as keyof EvaluationCriteria, parseFloat(e.target.value))}
              className="w-full h-1 bg-dorado-suave/10 rounded-full appearance-none cursor-pointer accent-dorado-suave hover:bg-dorado-suave/20 transition-all duration-300"
            />
          </div>
        ))}
      </div>

      <footer className="pt-10 border-t border-azul-noche/5 flex flex-col items-center gap-8">
        <div className="text-center">
          <span className="text-[10px] font-bold text-azul-noche/20 italic tracking-wide block mb-2">{normalizeSystemText('Valoración del proceso')}</span>
          <span className="text-5xl font-bold text-azul-noche serif-font">{calculateTotal().toFixed(1)}</span>
        </div>
        <button 
          onClick={() => onComplete(calculateTotal(), criteria)}
          className="px-12 py-4 bg-azul-noche text-dorado-suave rounded-full text-xs font-bold tracking-wide hover:bg-verde-salvia hover:text-white transition-all duration-700 shadow-lg"
        >
          {normalizeSystemText('Inscribir valoración')}
        </button>
      </footer>
    </div>
  );
};

export default SelfEvaluationGrid;