
import React from 'react';
import { AgeGroup } from '../types';
import { normalizeSystemText } from '../utils/linguisticNormalizer';

interface AgeGroupSelectorProps {
  currentGroup: AgeGroup;
  onChange: (group: AgeGroup) => void;
}

const AgeGroupSelector: React.FC<AgeGroupSelectorProps> = ({ currentGroup, onChange }) => {
  const groups: { id: AgeGroup; label: string }[] = [
    { id: 'infancia', label: 'infancia' },
    { id: 'adolescencia', label: 'adolescencia' },
    { id: 'jóvenes', label: 'jóvenes' },
    { id: 'adultos', label: 'adultos' }
  ];

  return (
    <div className="flex bg-white/60 backdrop-blur-xl p-2 rounded-full border border-dorado-suave/10 shadow-lg">
      {groups.map((g) => (
        <button
          key={g.id}
          onClick={() => onChange(g.id)}
          className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-tight transition-all duration-700 uppercase ${
            currentGroup === g.id
              ? 'bg-azul-noche text-dorado-suave shadow-xl scale-105'
              : 'text-azul-noche/25 hover:text-azul-noche/50 hover:bg-white/40'
          }`}
        >
          {normalizeSystemText(g.label)}
        </button>
      ))}
    </div>
  );
};

export default AgeGroupSelector;
