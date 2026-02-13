
import React, { useState, useEffect } from 'react';

interface PedagogicalReflectorProps {
  content: string;
}

/**
 * REFLECTOR PEDAGÓGICO
 * Un guardián silencioso que invita a la pausa cuando detecta saturación en la expresión.
 * No es un corrector ortográfico, es un mediador de presencia.
 */
const PedagogicalReflector: React.FC<PedagogicalReflectorProps> = ({ content }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Detecta una saturación de énfasis (gritar en la escritura) que dificulta la escucha del Símbolo.
    const isOverwhelmed = /[!¡?¿]{10,}/.test(content) || (content.length > 100 && content === content.toUpperCase());
    setIsActive(isOverwhelmed);
  }, [content]);

  if (!isActive) return null;

  return (
    <div className="fixed left-8 bottom-8 z-[60] animate-fade-in pointer-events-none">
      <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-[3rem] border border-dorado-suave/20 shadow-2xl max-w-xs pointer-events-auto">
        <div className="w-6 h-6 bg-dorado-suave/10 rounded-full flex items-center justify-center mb-4">
          <span className="text-dorado-suave text-xs">✧</span>
        </div>
        <p className="text-[12px] serif-font italic text-azul-noche/70 leading-relaxed">
          "El exceso de énfasis a veces oculta el susurro de la Imagen. El silencio permite que el Sueño se nombre a sí mismo en calma."
        </p>
        <footer className="mt-4 pt-4 border-t border-azul-noche/5">
          <p className="text-[9px] font-bold text-azul-noche/20 uppercase tracking-widest italic">
            Invitación a la escucha profunda
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PedagogicalReflector;
