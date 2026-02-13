
import React, { useMemo } from 'react';

type StateType = 'quietud' | 'pulso' | 'claridad' | 'sombra' | 'raiz' | 'equilibrio';

interface EmotionalCompanionProps {
  content: string;
}

const EmotionalCompanion: React.FC<EmotionalCompanionProps> = ({ content }) => {
  const state = useMemo(() => {
    const text = content.trim();
    const lower = text.toLowerCase();
    
    // Símbolo de la Bicicleta o Avance (Equilibrio)
    if (/bicicleta|pedal|equilibrio|avanzar|rueda|camino/.test(lower)) {
      return {
        id: 'equilibrio',
        color: 'bg-dorado-suave',
        glow: 'shadow-dorado-suave/40',
        form: 'path("M 50,0 L 95,25 L 95,75 L 50,100 L 5,75 L 5,25 Z")', // Hexágono (Glifo de Orden)
        message: 'Aparece el equilibrio del movimiento. Tu palabra sostiene su propio rumbo.'
      };
    }

    // Pulso: Tensión rítmica o énfasis alto
    if (/[!¡?¿]{3,}/.test(text) || /[a-z][A-Z]/.test(text)) {
      return {
        id: 'pulso',
        color: 'bg-rosa-ceniza',
        glow: 'shadow-rosa-ceniza/50',
        form: 'polygon(50% 0%, 0% 100%, 100% 100%)', // Triángulo (Fuerza ascendente)
        message: 'Tu palabra vibra con una fuerza rítmica. Hay intensidad protegiendo tu voz.'
      };
    }

    // Raíz: Conexión con lo profundo/ancestral
    if (/sueño|tierra|noche|antiguo|abuelo|madre|raiz|memoria/.test(lower)) {
      return {
        id: 'raiz',
        color: 'bg-azul-noche',
        glow: 'shadow-azul-noche/40',
        form: 'path("M 50,0 C 20,0 0,20 0,50 C 0,80 20,100 50,100 C 80,100 100,80 100,50 C 100,20 80,0 50,0 Z M 50,20 C 65,20 75,30 75,45 C 75,60 65,70 50,70 C 35,70 25,60 25,45 C 25,30 35,20 50,20 Z")', // Semilla Ancestral
        message: 'Habitas un territorio de memorias profundas. La palabra echa raíces en tu historia.'
      };
    }

    // Quietud: Estado base
    return {
      id: 'quietud',
      color: 'bg-verde-salvia',
      glow: 'shadow-verde-salvia/30',
      form: 'circle(45% at 50% 50%)', // Círculo (Unidad)
      message: 'El cauce de tu voz es sereno. Tu sentir tiene lógica y aquí descansa.'
    };
  }, [content]);

  return (
    <div className="flex flex-col items-center gap-12 p-10 bg-marfil-cósmico/40 rounded-[5rem] border border-white shadow-inner animate-fade-in sticky top-12 texture-grain">
      <div 
        className={`w-36 h-36 ${state.color} ${state.glow} transition-all duration-[3000ms] animate-breathe shadow-2xl`}
        style={{ clipPath: state.form }}
        aria-hidden="true"
      />
      
      <div className="text-center space-y-6">
        <h5 className="text-[11px] font-bold tracking-[0.2em] text-azul-noche/20 uppercase italic border-b border-azul-noche/5 pb-3">
          Resonancia Simbólica
        </h5>
        <p className="text-lg serif-font italic text-azul-noche/60 leading-relaxed px-6">
          {state.message}
        </p>
      </div>
      
      <div className="w-16 h-px bg-dorado-suave/20" />
    </div>
  );
};

export default EmotionalCompanion;
