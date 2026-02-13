
import React from 'react';
import { PedagogyState } from '../types';

interface LinguisticGuardianProps {
  children: React.ReactNode;
  content: string;
  pedagogy: PedagogyState;
}

const LinguisticGuardian: React.FC<LinguisticGuardianProps> = ({ children, content, pedagogy }) => {
  if (pedagogy === 'silent') return <>{children}</>;

  const words = content.trim().split(/\s+/).filter(w => w.length > 0);
  const isSaturated = /[!¡?¿]{6,}/.test(content);

  if (!isSaturated) return <>{children}</>;

  return (
    <div className="relative group/guardian">
      <div className="absolute -left-12 top-2 z-50 animate-fade-in">
        <div className="w-8 h-8 rounded-full bg-white border border-dorado-suave/30 text-dorado-suave flex items-center justify-center shadow-sm cursor-help">
          <span className="text-[10px]">✧</span>
          <div className="absolute left-10 top-0 w-64 bg-white p-6 rounded-[2rem] border border-dorado-suave/10 shadow-2xl opacity-0 group-hover/guardian:opacity-100 transition-opacity pointer-events-none">
            <p className="text-[11px] serif-font italic text-azul-noche/70 leading-relaxed">
              El énfasis es un grito del alma. A veces, el silencio de un punto permite que el grito sea escuchado con más claridad.
            </p>
          </div>
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default LinguisticGuardian;
