
import React, { useState } from 'react';
import { UserRole, GradeLevel, AgeGroup, UserProfile } from '../types';
import { normalizeSystemText } from '../utils/linguisticNormalizer';
import Welcome from './Welcome';

interface IdentificationScreenProps {
  onComplete: (profile: Omit<UserProfile, 'studentCode'>) => void;
}

const IdentificationScreen: React.FC<IdentificationScreenProps> = ({ onComplete }) => {
  const [role, setRole] = useState<UserRole>('estudiante');
  const [grade, setGrade] = useState<GradeLevel>('Sexto – Séptimo');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('jóvenes');

  const handleSubmit = () => {
    onComplete({ role, grade, ageGroup });
  };

  const grades: GradeLevel[] = [
    'Preescolar', 'Primero – Segundo', 'Tercero – Cuarto', 'Quinto',
    'Sexto – Séptimo', 'Octavo – Noveno', 'Décimo – Undécimo', 'Adultos'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-marfil-cosmico">
      <div className="w-full max-w-2xl space-y-8 animate-fade-in">
        <Welcome isIdentificationView={true} />
        
        <div className="bg-white/60 backdrop-blur-sm p-8 sm:p-10 rounded-xl border border-azul-noche/5 shadow-sm space-y-8">
          <header className="text-center space-y-1">
            <h3 className="text-lg font-bold text-azul-noche serif-font italic">Identificación pedagógica</h3>
            <p className="text-[10px] text-azul-noche/40 font-semibold italic">Registro institucional para la memoria del ser</p>
          </header>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-azul-noche/30 italic ml-2">Mi rol institucional:</label>
              <div className="grid grid-cols-2 gap-4">
                {(['estudiante', 'adulto'] as UserRole[]).map(r => (
                  <button 
                    key={r}
                    onClick={() => setRole(r)}
                    className={`py-3 rounded-xl text-xs font-bold italic transition-all border ${role === r ? 'bg-azul-noche text-dorado-suave border-azul-noche' : 'bg-white/40 text-azul-noche/30 border-azul-noche/5'}`}
                  >
                    {normalizeSystemText(r)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-azul-noche/30 italic ml-2">Grado o nivel educativo:</label>
              <select 
                value={grade}
                onChange={(e) => setGrade(e.target.value as GradeLevel)}
                className="w-full bg-white/60 border border-azul-noche/5 p-4 rounded-xl text-sm serif-font italic outline-none focus:border-verde-salvia transition-all shadow-sm text-azul-noche/80"
              >
                {grades.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-azul-noche/30 italic ml-2">Ciclo vital:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['infancia', 'adolescencia', 'jóvenes', 'adultos'] as AgeGroup[]).map(group => (
                  <button 
                    key={group}
                    onClick={() => setAgeGroup(group)}
                    className={`py-2 rounded-xl text-[10px] font-bold italic transition-all border ${ageGroup === group ? 'bg-verde-salvia text-white border-verde-salvia' : 'bg-white/20 text-azul-noche/30 border-azul-noche/5'}`}
                  >
                    {normalizeSystemText(group)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full py-4 bg-azul-noche text-dorado-suave rounded-full font-bold text-sm italic transition-all shadow-sm hover:bg-verde-salvia hover:text-white"
          >
            Habitar mi palabra
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentificationScreen;
