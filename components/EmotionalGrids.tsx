import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import { Cloud, Droplets, Home, Trees, Shield, Wind, Mountain, Moon } from 'lucide-react';

interface GridCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const categories: GridCategory[] = [
  { id: 'agua', label: 'Agua', icon: <Droplets size={16} />, color: 'text-blue-400' },
  { id: 'camino', label: 'Camino', icon: <Wind size={16} />, color: 'text-stone-400' },
  { id: 'casa', label: 'Casa', icon: <Home size={16} />, color: 'text-amber-600' },
  { id: 'sombra', label: 'Sombra', icon: <Moon size={16} />, color: 'text-indigo-900' },
  { id: 'animal', label: 'Animal', icon: <Shield size={16} />, color: 'text-verde-salvia' },
  { id: 'puente', label: 'Puente', icon: <Cloud size={16} />, color: 'text-dorado-suave' },
  { id: 'montaña', label: 'Montaña', icon: <Mountain size={16} />, color: 'text-gris-piedra' },
  { id: 'espejo', label: 'Espejo', icon: <Trees size={16} />, color: 'text-teal-600' }
];

interface EmotionalGridsProps {
  onSelect?: (categoryId: string) => void;
  selectedId?: string;
}

const EmotionalGrids: React.FC<EmotionalGridsProps> = ({ onSelect, selectedId }) => {
  return (
    <div className="space-y-6">
      <header className="text-center space-y-2">
        <h4 className="text-sm font-bold text-azul-noche/30 italic">Rejilla emocional de símbolos recurrentes</h4>
        <div className="w-12 h-px bg-dorado-suave/20 mx-auto"></div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect?.(cat.id)}
            className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${
              selectedId === cat.id 
                ? 'bg-azul-noche text-dorado-suave border-azul-noche shadow-md scale-105' 
                : 'bg-white/40 text-azul-noche/30 border-azul-noche/5 hover:border-dorado-suave/20'
            }`}
          >
            <div className={`${selectedId === cat.id ? 'text-dorado-suave' : cat.color} opacity-80`}>
              {cat.icon}
            </div>
            <span className="text-xs font-bold italic">{normalizeSystemText(cat.label)}</span>
          </button>
        ))}
      </div>
      
      <p className="text-[10px] text-azul-noche/40 text-center italic leading-relaxed px-4">
        {normalizeSpanishText("La rejilla es una extensión de su cuaderno. Ayuda a identificar el clima de su relato antes de profundizar en el símbolo.")}
      </p>
    </div>
  );
};

export default EmotionalGrids;