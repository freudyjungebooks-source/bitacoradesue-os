import React, { useMemo, useState } from 'react';
import { DreamEntry } from '../types';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Sprout, Wind, Landmark, Compass, Sparkles } from 'lucide-react';

const m = motion as any;

interface WordCircleProps {
  entries: DreamEntry[];
}

const WordCircle: React.FC<WordCircleProps> = ({ entries }) => {
  const [isRitualActive, setIsRitualActive] = useState(false);

  // Calcular resonancias colectivas (símbolos más frecuentes)
  const collectiveResonances = useMemo(() => {
    const symbolCounts: Record<string, number> = {};
    entries.forEach(entry => {
      entry.readingLayer?.lecturaSimbolica?.símbolosDetectados?.forEach(symbol => {
        symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
      });
    });
    
    return Object.entries(symbolCounts)
      .map(([symbol, count]) => ({ symbol, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [entries]);

  const cosmicCycle = useMemo(() => {
    const day = new Date().getDate();
    const cycleNames = ["Semilla", "Viento", "Agua", "Fuego", "Tierra", "Luz", "Sombra", "Espejo", "Raíz", "Puente"];
    return cycleNames[day % cycleNames.length];
  }, []);

  const prompts: Record<string, string> = {
    "Semilla": "Hoy el círculo se abre para honrar lo pequeño que busca crecer en nosotros.",
    "Viento": "Hablemos de los cambios invisibles que mueven nuestra identidad hoy.",
    "Agua": "El círculo fluye. Compartamos qué sentimientos buscan limpieza y cauce.",
    "Fuego": "La palabra arde. ¿Qué pasión o rabia sagrada queremos transformar en luz?",
    "Tierra": "Hoy nos enraizamos. ¿Qué memorias familiares sostienen nuestro caminar?",
    "Luz": "Brillemos. ¿Qué descubrimiento sobre nosotros mismos ha traído claridad al aula?",
    "Sombra": "Habitemos el misterio. ¿Qué temores estamos aprendiendo a mirar con amor?",
    "Espejo": "Reflejémonos. ¿Qué veo en el otro que también habita en mi propio ser?",
    "Raíz": "Ancestralidad. Honremos hoy la palabra de quienes vinieron antes que nosotros.",
    "Puente": "Tránsito. ¿Cómo podemos unir nuestras orillas para construir un mundo común?"
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16 pb-40 animate-fade-in">
      <header className="text-center space-y-6">
        <div className="flex justify-center opacity-30 mb-2">
          <Users size={32} strokeWidth={1} className="text-azul-noche" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-azul-noche serif-font italic tracking-tight">
            {normalizeSystemText('Círculos de la palabra')}
          </h1>
          <p className="text-xs font-bold text-dorado-suave tracking-wide italic">
            Encuentro, síntesis y resonancia colectiva
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <m.div 
          whileHover={{ y: -5 }}
          className="bg-white/70 p-10 rounded-[3rem] border border-azul-noche/5 shadow-sm space-y-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 text-dorado-suave pointer-events-none">
            <Sparkles size={120} />
          </div>
          <div className="w-16 h-16 bg-azul-noche text-dorado-suave rounded-full flex items-center justify-center shadow-lg mb-2">
             <Landmark size={24} strokeWidth={1} />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-azul-noche/30 italic tracking-wide">{normalizeSystemText('Ciclo del día')}</h3>
            <h4 className="text-2xl font-bold text-azul-noche serif-font italic leading-tight">{normalizeSystemText(cosmicCycle)}</h4>
          </div>
          <p className="text-base serif-font italic text-azul-noche/70 leading-relaxed px-4">
            {normalizeSpanishText(prompts[cosmicCycle] || "El círculo espera tu palabra soberana.")}
          </p>
          <button 
            onClick={() => setIsRitualActive(!isRitualActive)}
            className="px-8 py-3 bg-azul-noche text-dorado-suave rounded-full text-[10px] font-bold tracking-wide hover:bg-verde-salvia hover:text-white transition-all shadow-md italic"
          >
            {isRitualActive ? normalizeSystemText('Cerrar círculo') : normalizeSystemText('Abrir diálogo ritual')}
          </button>
        </m.div>

        <div className="bg-azul-noche p-10 rounded-[3rem] text-dorado-suave space-y-8 flex flex-col justify-center shadow-xl">
          <header className="space-y-2 border-b border-dorado-suave/10 pb-4">
            <div className="flex items-center gap-3">
              <Compass size={16} className="opacity-40" />
              <h3 className="text-xs font-bold italic tracking-wide">{normalizeSystemText('Resonancias del grupo')}</h3>
            </div>
            <p className="text-[10px] opacity-40 italic">{normalizeSpanishText('Símbolos que habitan la memoria colectiva del aula.')}</p>
          </header>
          
          <div className="space-y-6">
            {collectiveResonances.length > 0 ? (
              collectiveResonances.map((res, i) => (
                <div key={i} className="flex items-center justify-between group">
                   <div className="flex items-center gap-4">
                      <span className="text-xs font-bold opacity-20 serif-font">0{i+1}</span>
                      <span className="text-lg serif-font italic group-hover:translate-x-1 transition-transform">{res.symbol}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="h-1 bg-dorado-suave/20 rounded-full w-20 overflow-hidden">
                         <m.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(res.count / entries.length) * 100}%` }}
                          className="h-full bg-dorado-suave"
                         />
                      </div>
                      <span className="text-[10px] font-bold opacity-30 italic">{res.count} ecos</span>
                   </div>
                </div>
              ))
            ) : (
              <p className="text-sm italic opacity-30 text-center py-10">El archivo aún guarda silencio.</p>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isRitualActive && (
          <m.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/80 p-12 rounded-[4rem] border-2 border-verde-salvia/20 shadow-2xl space-y-12 text-center relative overflow-hidden texture-grain"
          >
            <header className="space-y-4">
              <div className="flex justify-center gap-4 text-verde-salvia opacity-60 mb-2">
                 <Sprout size={24} />
                 <Wind size={24} />
                 <Sprout size={24} />
              </div>
              <h2 className="text-2xl font-bold text-azul-noche serif-font italic">{normalizeSystemText('Voces en el recinto')}</h2>
              <p className="text-sm text-azul-noche/40 italic max-w-2xl mx-auto">
                {normalizeSpanishText('Este es un espacio de escucha atenta. Cada palabra que leemos del archivo es un regalo de la intimidad de un compañero.')}
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {entries.slice(0, 3).map((entry, i) => (
                 <div key={i} className="p-8 bg-marfil-cosmico/50 rounded-[2.5rem] border border-azul-noche/5 space-y-4 hover:shadow-lg transition-all text-left">
                    <span className="text-[9px] font-bold text-dorado-suave italic tracking-wide">{entry.date}</span>
                    <h4 className="text-base font-bold text-azul-noche serif-font italic leading-tight">{entry.title}</h4>
                    <p className="text-xs text-azul-noche/60 serif-font italic line-clamp-3 leading-relaxed">"{entry.content}"</p>
                    <div className="flex gap-2 pt-2">
                       {entry.readingLayer?.lecturaSimbolica?.símbolosDetectados?.slice(0, 2).map((s, j) => (
                         <span key={j} className="text-[8px] px-2 py-0.5 bg-white border border-azul-noche/5 rounded-full text-azul-noche/40 font-bold italic">{s}</span>
                       ))}
                    </div>
                 </div>
               ))}
            </div>

            <footer className="pt-8 border-t border-azul-noche/5 flex flex-col items-center gap-4">
               <p className="text-[10px] font-bold text-azul-noche/20 italic tracking-wide">Escucha profunda · Presencia ética</p>
               <button 
                onClick={() => setIsRitualActive(false)}
                className="text-[10px] text-azul-noche/30 hover:text-azul-noche font-bold italic border-b border-transparent hover:border-azul-noche transition-all"
               >
                 Cerrar recinto de diálogo
               </button>
            </footer>
          </m.section>
        )}
      </AnimatePresence>

      <footer className="pt-20 border-t border-azul-noche/5 text-center opacity-40 flex flex-col items-center gap-4">
        <p className="text-[10px] text-azul-noche italic">Ser · Soberanía · Memoria · Casa común</p>
        <Wind size={14} strokeWidth={1} />
        <p className="text-[8px] font-medium italic">Módulo de círculos de palabra · Versión 1.0</p>
      </footer>
    </div>
  );
};

export default WordCircle;