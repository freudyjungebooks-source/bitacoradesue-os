
import React from 'react';
import { SystemMode } from '../types';
import { normalizeSpanishText } from '../utils/linguisticNormalizer';

interface SystemModeSelectorProps {
  currentMode: SystemMode;
  onModeChange: (mode: SystemMode) => void;
}

const SystemModeSelector: React.FC<SystemModeSelectorProps> = ({ currentMode, onModeChange }) => {
  const modes: { id: SystemMode; label: string; desc: string }[] = [
    { 
      id: 'estudiante', 
      label: 'Estudiante', 
      desc: 'Explora, escribe y habita tu palabra a tu propio ritmo.' 
    },
    { 
      id: 'profesor', 
      label: 'Profesor', 
      desc: 'Acompaña con cuidado el proceso del estudiante.' 
    },
    { 
      id: 'produccion', 
      label: 'Publicar', 
      desc: 'Prepara tu relato para ser compartido con la comunidad.' 
    }
  ];

  return (
    <div className="fixed top-6 right-6 z-[150] flex flex-col items-end gap-2">
      <div className="flex bg-white/70 backdrop-blur-xl p-1.5 rounded-full border border-azul-noche/5 shadow-2xl">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className={`px-6 py-2 rounded-full text-[11px] font-bold tracking-tight transition-ritual ${
              currentMode === m.id
                ? 'bg-azul-noche text-dorado-suave'
                : 'text-azul-noche/25 hover:text-azul-noche/50'
            }`}
          >
            {normalizeSpanishText(m.label)}
          </button>
        ))}
      </div>
      <p className="text-[10px] font-bold text-azul-noche/30 italic mr-6 tracking-tight animate-fade-in">
        {normalizeSpanishText(modes.find(m => m.id === currentMode)?.desc || "")}
      </p>
    </div>
  );
};

export default SystemModeSelector;
