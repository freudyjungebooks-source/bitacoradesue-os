
import React, { useState } from 'react';
import { Workshop } from '../types';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import SelfEvaluationGrid from './SelfEvaluationGrid';

interface WorkshopCardProps {
  workshop: Workshop;
  onDelete: (id: string) => void;
  onUpdate?: (updated: Workshop) => void;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, onDelete, onUpdate }) => {
  const [showEvaluation, setShowEvaluation] = useState(false);

  const handleEvaluationComplete = (total: number, criteria: any) => {
    if (onUpdate) {
      onUpdate({
        ...workshop,
        selfEvaluation: { total, criteria }
      } as any);
    }
    setShowEvaluation(false);
  };

  return (
    <article className="bg-white/60 backdrop-blur-3xl rounded-[4rem] border border-dorado-suave/20 p-12 sm:p-20 shadow-2xl texture-grain space-y-20 animate-fade-in relative overflow-hidden group hover:border-dorado-suave/40 transition-all duration-1000">
      <div className="absolute top-0 right-0 w-80 h-80 bg-dorado-suave/5 rounded-full -mr-40 -mt-40 blur-[120px] group-hover:bg-dorado-suave/10 transition-colors"></div>
      
      <header className="space-y-6 relative z-10 text-center">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold text-verde-salvia tracking-[0.3em] italic opacity-60 uppercase">
            {normalizeSystemText(`Símbolo central: ${workshop.centralSymbol}`)}
          </span>
          <button 
            onClick={() => onDelete(workshop.id)} 
            className="text-azul-noche/15 hover:text-red-400 p-3 bg-marfil-cósmico/40 rounded-full transition-all hover:rotate-90"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-3xl sm:text-4xl font-bold text-azul-noche serif-font italic leading-tight tracking-tighter">
            {normalizeSpanishText(workshop.workshopTitle)}
          </h3>
          <div className="flex justify-center items-center gap-4 text-azul-noche/40 serif-font italic text-lg">
             <span>{workshop.grade}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-dorado-suave/30"></span>
             <span>{workshop.ageRange}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-dorado-suave/30"></span>
             <span>{workshop.duration}</span>
          </div>
        </div>
      </header>

      {showEvaluation ? (
        <SelfEvaluationGrid onComplete={handleEvaluationComplete} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          <section className="lg:col-span-5 space-y-12">
            <div className="bg-azul-noche text-dorado-suave p-10 rounded-[3.5rem] shadow-xl relative overflow-hidden border border-dorado-suave/10">
              <h4 className="text-[9px] font-bold tracking-[0.4em] mb-4 opacity-40 uppercase">
                {normalizeSystemText('objetivos del ser')}
              </h4>
              <p className="text-xl serif-font italic leading-snug">{normalizeSpanishText(workshop.humanObjectives)}</p>
            </div>

            <div className="space-y-8">
              <div className="p-10 bg-white/40 rounded-[3rem] border border-azul-noche/5 shadow-sm">
                <h5 className="text-[9px] font-bold text-azul-noche/30 tracking-[0.3em] mb-4 italic uppercase">
                  {normalizeSystemText('objetivo lingüístico')}
                </h5>
                <p className="text-md text-azul-noche/70 serif-font italic leading-relaxed">
                  {normalizeSpanishText(workshop.linguisticObjectives)}
                </p>
              </div>

              {(workshop as any).selfEvaluation && (
                <div className="p-10 bg-verde-salvia/5 rounded-[3rem] border border-verde-salvia/20 text-center space-y-2">
                  <h6 className="text-[10px] font-bold text-verde-salvia tracking-widest uppercase">Tu Valoración</h6>
                  <p className="text-4xl font-bold text-azul-noche serif-font">{(workshop as any).selfEvaluation.total.toFixed(1)}</p>
                </div>
              )}
            </div>
          </section>

          <section className="lg:col-span-7 space-y-12">
            <div className="p-10 bg-white/80 rounded-[4rem] shadow-sm border border-white space-y-12 relative">
              <h5 className="text-[10px] font-bold text-verde-salvia tracking-[0.4em] mb-10 italic uppercase">
                {normalizeSystemText('itinerario de la palabra')}
              </h5>
              <div className="space-y-12">
                {workshop.activities?.map((act, i) => (
                  <div key={i} className="space-y-3 pl-8 border-l border-dorado-suave/20 relative group/act">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-white border border-dorado-suave/30 rounded-full group-hover/act:bg-dorado-suave transition-colors"></div>
                    <h6 className="text-xl font-bold text-azul-noche serif-font italic">{normalizeSpanishText(act.step)}</h6>
                    <p className="text-md text-azul-noche/60 serif-font italic leading-relaxed">
                      {normalizeSpanishText(act.description)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button 
                onClick={() => setShowEvaluation(true)}
                className="px-10 py-4 bg-dorado-suave text-azul-noche rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-azul-noche hover:text-dorado-suave transition-ritual shadow-xl"
              >
                { (workshop as any).selfEvaluation ? 'Actualizar Autoevaluación' : 'Iniciar Autoevaluación' }
              </button>
            </div>
          </section>
        </div>
      )}

      <footer className="pt-16 text-center relative z-10 border-t border-azul-noche/5">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="space-y-3 p-6 bg-white/30 rounded-3xl">
               <h6 className="text-[8px] font-bold text-azul-noche/30 tracking-widest uppercase italic">Estándares y DBA</h6>
               <ul className="text-[11px] italic text-azul-noche/60 space-y-2">
                  {workshop.academicIntegration.languageStandards.map((s, i) => <li key={i} className="flex gap-2">✦ {normalizeSpanishText(s)}</li>)}
                  {workshop.academicIntegration.dba.map((d, i) => <li key={i} className="flex gap-2">✧ {normalizeSpanishText(d)}</li>)}
               </ul>
            </div>
            <div className="space-y-3 p-6 bg-white/30 rounded-3xl">
               <h6 className="text-[8px] font-bold text-verde-salvia/40 tracking-widest uppercase italic">Lineamientos y Ciudadanía</h6>
               <ul className="text-[11px] italic text-azul-noche/60 space-y-2">
                  {workshop.academicIntegration.curriculumGuidelines?.map((g, i) => <li key={i} className="flex gap-2">◈ {normalizeSpanishText(g)}</li>)}
                  {workshop.academicIntegration.citizenshipCompetencies.map((s, i) => <li key={i} className="flex gap-2">◧ {normalizeSpanishText(s)}</li>)}
               </ul>
            </div>
            <div className="space-y-3 p-6 bg-white/30 rounded-3xl">
               <h6 className="text-[8px] font-bold text-dorado-suave/40 tracking-widest uppercase italic">Resultados de Aprendizaje</h6>
               <ul className="text-[11px] italic text-azul-noche/60 space-y-2">
                  {workshop.academicIntegration.learningOutcomes.map((o, i) => <li key={i} className="flex gap-2">▣ {normalizeSpanishText(o)}</li>)}
               </ul>
            </div>
         </div>
         <p className="text-[9px] font-bold text-azul-noche/20 tracking-[0.6em] italic mt-12 uppercase">
           {normalizeSystemText('arquitectura del ser · portal de la palabra')}
         </p>
      </footer>
    </article>
  );
};

export default WorkshopCard;
