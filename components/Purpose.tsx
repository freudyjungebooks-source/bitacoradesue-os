import React from 'react';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import { motion } from 'framer-motion';
import ErrorBoundary from './ErrorBoundary';
import { ShieldCheck, BookOpen, Landmark, Scale, Scroll, Globe, Layers, UserCheck } from 'lucide-react';

const PurposeContent: React.FC = () => {
  const pillars = [
    {
      id: "I",
      icon: <BookOpen size={16} className="text-verde-salvia" />,
      title: "Aprendizaje vivo (Piaget)",
      text: "Reconocemos que el ser aprende en relación activa con su entorno. El sueño es movimiento interior, el símbolo es imagen y la palabra es lenguaje transformador."
    },
    {
      id: "II",
      icon: <Layers size={16} className="text-dorado-suave" />,
      title: "Cooperación interpretativa",
      text: "Siguiendo a Umberto Eco, el relato no es un texto cerrado. Los espacios de silencio son invitaciones para que el estudiante construya su propio sentido."
    },
    {
      id: "III",
      icon: <Landmark size={16} className="text-azul-noche" />,
      title: "Arquitectura sistémica",
      text: "No observamos al individuo aislado, sino al ser en su entramado familiar y cultural. Cuando una persona ordena su historia, el sistema completo se mueve."
    },
    {
      id: "IV",
      icon: <ShieldCheck size={16} className="text-rosa-ceniza" />,
      title: "Privacidad y ética radical",
      text: "La bitácora es un templo para la introspección. Protegemos la intimidad centrando la labor pedagógica en la mediación lingüística y el respeto profundo."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-12 px-6 animate-fade-in pb-20">
      <section className="bg-white/60 p-8 sm:p-12 rounded-2xl border border-azul-noche/5 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-1000 pointer-events-none">
           <Scroll size={160} />
        </div>
        <div className="relative z-10 space-y-6">
          <header className="space-y-4">
            <div className="inline-block px-4 py-1.5 bg-azul-noche text-dorado-suave rounded-full font-bold text-[10px] italic shadow-sm">
              {normalizeSystemText('Misión del recinto digital')}
            </div>
            <h1 className="text-2xl font-bold text-azul-noche serif-font italic tracking-tight leading-snug">
              Un templo para la palabra y la soberanía del ser
            </h1>
          </header>
          <p className="text-base serif-font italic leading-relaxed text-azul-noche/70">
            {normalizeSpanishText('Bitácora de sueños nace como una respuesta consciente frente a modelos educativos rígidos. Proponemos un espacio donde el estudiante se mire en su escritura, haga consciente su diario vivir y habite la educación como un despertar permanente.')}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar) => (
          <div key={pillar.id} className="p-8 bg-white/40 rounded-2xl border border-azul-noche/5 space-y-5 shadow-sm hover:bg-white transition-all duration-700">
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-marfil-cosmico rounded-xl shadow-sm">
                {pillar.icon}
              </div>
              <span className="text-lg font-bold text-dorado-suave/20 serif-font italic">{pillar.id}</span>
            </div>
            <h3 className="text-base font-bold text-azul-noche serif-font italic">{normalizeSystemText(pillar.title)}</h3>
            <p className="text-sm text-azul-noche/60 serif-font italic leading-relaxed">{normalizeSpanishText(pillar.text)}</p>
          </div>
        ))}
      </div>

      <div className="bg-azul-noche/5 p-8 rounded-2xl border border-azul-noche/5 text-center space-y-4">
        <UserCheck size={20} className="mx-auto text-verde-salvia opacity-60" />
        <h4 className="text-sm font-bold text-azul-noche serif-font italic">Criterio de validación del ser</h4>
        <p className="text-xs text-azul-noche/40 italic serif-font">
          Antes de cada ajuste o acción, nos preguntamos: ¿fortalece la dignidad y el proceso interior del estudiante?
        </p>
      </div>

      <footer className="text-center pt-8 border-t border-azul-noche/5 space-y-6 opacity-30">
        <p className="text-xs font-bold text-azul-noche italic tracking-[0.2em]">
          Ser · Soberanía · Memoria · Casa común
        </p>
        <Globe size={14} className="mx-auto" strokeWidth={1} />
      </footer>
    </div>
  );
};

const Purpose: React.FC = () => (
  <ErrorBoundary>
    <PurposeContent />
  </ErrorBoundary>
);

export default Purpose;