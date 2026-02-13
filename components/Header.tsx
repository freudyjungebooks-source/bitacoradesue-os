
import React from 'react';
import { normalizeSystemText } from '../utils/linguisticNormalizer';
import { AppView } from '../types';
import { motion } from 'framer-motion';

// Fix: Using a type-casted alias for motion to bypass environment-specific type errors for motion props.
const m = motion as any;

interface HeaderProps {
  onOpenForm: () => void;
  currentView: AppView;
  onToggleView: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenForm, currentView, onToggleView }) => {
  const navItems: { id: AppView; label: string }[] = [
    { id: 'bitacora', label: 'Bitácora' },
    { id: 'circulos', label: 'Círculos' },
    { id: 'diccionario', label: 'Símbolos' },
    { id: 'talleres', label: 'Talleres' },
    { id: 'memoria', label: 'Memoria' },
    { id: 'integracion', label: 'Currículo' },
    { id: 'soporte', label: 'Cuidado' },
    { id: 'purpose', label: 'Propósito' },
    { id: 'institucional', label: 'Referente' }
  ];

  return (
    <header className="pt-6 pb-4 flex flex-col items-center text-center">
      {/* Fix: Using m.div alias to bypass framer-motion type errors */}
      <m.div 
        className="mb-4 group cursor-pointer"
        onClick={onOpenForm}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-9 h-9 bg-azul-noche text-dorado-suave rounded-full flex items-center justify-center border border-azul-noche/10 shadow-sm transition-all group-hover:bg-verde-salvia group-hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </m.div>

      {/* Fix: Using m.h1 alias to bypass framer-motion type errors */}
      <m.h1 
        className="text-xl font-semibold text-azul-noche serif-font italic tracking-tight mb-1"
      >
        {normalizeSystemText('Bitácora de sueños')}
      </m.h1>
      
      {/* Fix: Using m.p alias to bypass framer-motion type errors */}
      <m.p 
        className="text-xs font-medium text-azul-noche/40 mb-8 italic"
      >
        {normalizeSystemText('Soberanía, memoria e integración pedagógica')}
      </m.p>

      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 border-b border-azul-noche/5 pb-4 w-full max-w-4xl px-4">
        {navItems.map(nav => (
          <button 
            key={nav.id}
            onClick={() => onToggleView(nav.id)}
            className={`text-xs font-medium transition-all pb-1 border-b-2 italic relative ${
              currentView === nav.id 
                ? 'text-azul-noche border-dorado-suave' 
                : 'text-azul-noche/30 border-transparent hover:text-azul-noche/50'
            }`}
          >
            {normalizeSystemText(nav.label)}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
