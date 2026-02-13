
import React from 'react';
import { normalizeSpanishText } from '../utils/linguisticNormalizer';
import { getHealingVoice } from '../utils/healingLanguage';

interface PortalMessageProps {
  message: string;
  type?: 'info' | 'error' | 'success';
  onClose: () => void;
}

const PortalMessage: React.FC<PortalMessageProps> = ({ message, type = 'info', onClose }) => {
  const styles = {
    info: 'border-dorado-suave/20 text-azul-noche bg-marfil-cósmico/98 shadow-dorado-suave/5',
    error: 'border-rosa-ceniza text-gris-piedra bg-white/98 shadow-black/5',
    success: 'border-verde-salvia/20 text-verde-salvia bg-white/98 shadow-verde-salvia/5'
  };

  const icons = {
    info: '◈',
    error: '◇',
    success: '◆'
  };

  // Voz sanadora para errores, si no, normalización poética
  const displayMessage = (message === "error" || message.toLowerCase().includes("problema")) 
    ? getHealingVoice('jóvenes', 'error') 
    : normalizeSpanishText(message);

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md animate-fade-in-up">
      <div className={`p-8 rounded-[2.5rem] border shadow-2xl backdrop-blur-3xl flex items-center gap-6 transition-ritual ${styles[type]}`}>
        <span className="text-xl opacity-40 select-none">{icons[type]}</span>
        <div className="flex-1">
          <p className="serif-font italic text-lg leading-snug">
            {displayMessage}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-3 hover:bg-black/5 rounded-full transition-ritual opacity-30 hover:opacity-100"
          aria-label={normalizeSpanishText("Cerrar aviso")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PortalMessage;
