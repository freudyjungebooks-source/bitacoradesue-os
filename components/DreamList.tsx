import React from 'react';
import { DreamEntry, SystemMode } from '../types';
import DreamEntryCard from './DreamEntryCard';
import { normalizeSpanishText } from '../utils/linguisticNormalizer';

interface DreamListProps {
  entries: DreamEntry[];
  onDelete: (id: string) => void;
  onUpdate?: (entry: DreamEntry) => void;
  mode: SystemMode;
}

/**
 * LISTADO DE MEMORIA SOBERANA
 * El sistema trata la ausencia de datos como un estado de potencialidad pedagógica.
 */
const DreamList: React.FC<DreamListProps> = ({ entries, onDelete, onUpdate, mode }) => {
  const safeEntries = Array.isArray(entries) ? entries : [];

  if (safeEntries.length === 0) {
    return (
      <section className="py-48 text-center animate-fade-in" aria-live="polite">
        <div className="max-w-2xl mx-auto space-y-12 text-azul-noche/40">
          <div className="flex justify-center items-center gap-8 opacity-20">
            <div className="w-16 h-px bg-azul-noche"></div>
            <div className="w-2 h-2 rounded-full bg-azul-noche"></div>
            <div className="w-16 h-px bg-azul-noche"></div>
          </div>

          <div className="space-y-6 px-6">
            <p className="serif-font italic text-3xl md:text-4xl leading-relaxed">
              {normalizeSpanishText(
                'Este espacio guarda silencio. No es ausencia: es espera. Tu palabra es la semilla que habitará esta memoria cuando el tiempo sea maduro.'
              )}
            </p>
          </div>

          <div className="pt-8">
            <p className="text-xs font-bold tracking-[0.2em] italic opacity-30">
              Archivo en reposo · Ciclo de silencio fértil
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-16 animate-fade-in">
      {safeEntries.map((entry) => (
        <DreamEntryCard
          key={entry.id}
          entry={entry}
          onDelete={onDelete}
          onUpdate={onUpdate}
          mode={mode}
        />
      ))}
    </section>
  );
};

export default DreamList;