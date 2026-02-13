import React, { useMemo } from 'react';
import { UserRole, GradeLevel, AgeGroup, UserProfile } from '../types';
import { normalizeSystemText } from '../utils/linguisticNormalizer';
import { motion } from 'framer-motion';

// Fix: Using a type-casted alias for motion to bypass environment-specific type errors for motion props.
const m = motion as any;

interface IdentificationBarProps {
  profile: UserProfile;
  onChange: (updated: UserProfile) => void;
  isSynced?: boolean;
}

const IdentificationBar: React.FC<IdentificationBarProps> = ({ profile, onChange, isSynced = true }) => {
  const roles: UserRole[] = ['estudiante', 'adulto'];
  const grades: GradeLevel[] = [
    'Preescolar', 'Primero – Segundo', 'Tercero – Cuarto', 'Quinto',
    'Sexto – Séptimo', 'Octavo – Noveno', 'Décimo – Undécimo', 'Adultos'
  ];

  const cosmicCycle = useMemo(() => {
    const today = new Date();
    const day = today.getDate();
    const cycleNames = ["Semilla", "Viento", "Agua", "Fuego", "Tierra", "Luz", "Sombra", "Espejo", "Raíz", "Puente"];
    const currentCycle = cycleNames[day % cycleNames.length];
    return `${currentCycle} del mes`;
  }, []);

  return (
    <m.div 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-[200] w-full bg-marfil-cosmico/95 backdrop-blur-md border-b border-azul-noche/5 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 mb-6 rounded-b-lg shadow-sm"
    >
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-azul-noche/40 italic">Portal de la palabra</span>
          <span className="text-sm font-semibold text-azul-noche serif-font italic">{profile.studentCode}</span>
        </div>
        
        <div className="flex items-center gap-2.5 px-3 py-1 rounded-md border border-azul-noche/5 bg-white/40">
          <div className={`w-1.5 h-1.5 rounded-full ${isSynced ? 'bg-verde-salvia' : 'bg-dorado-suave opacity-40'}`}></div>
          <span className="text-xs font-medium text-azul-noche/60 italic">
            {isSynced ? normalizeSystemText('Sincronizado') : normalizeSystemText('Local')}
          </span>
        </div>

        <div className="hidden sm:flex flex-col gap-0 border-l border-azul-noche/5 pl-6">
            <span className="text-xs font-medium text-dorado-suave/80 italic">Ciclo vital</span>
            <span className="text-xs font-semibold text-azul-noche/60 italic">{cosmicCycle}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-0">
          <label className="text-xs font-medium text-azul-noche/30 italic ml-1">Mi rol</label>
          <select 
            value={profile.role}
            onChange={(e) => onChange({ ...profile, role: e.target.value as UserRole })}
            className="bg-transparent border-none text-xs font-semibold text-azul-noche focus:ring-0 cursor-pointer py-0 h-6"
          >
            {roles.map(r => <option key={r} value={r}>{normalizeSystemText(r)}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-0 border-l border-azul-noche/5 pl-4">
          <label className="text-xs font-medium text-azul-noche/30 italic ml-1">Grado</label>
          <select 
            value={profile.grade}
            onChange={(e) => onChange({ ...profile, grade: e.target.value as GradeLevel })}
            className="bg-transparent border-none text-xs font-semibold text-azul-noche focus:ring-0 cursor-pointer py-0 h-6"
          >
            {grades.map(g => (
              <option key={g} value={g}>
                {normalizeSystemText(g)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </m.div>
  );
};

export default IdentificationBar;