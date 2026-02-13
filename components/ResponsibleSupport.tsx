
import React from 'react';
import { EmotionalTone } from '../types';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import { motion } from 'framer-motion';
import { Landmark, PhoneCall, Bookmark, Compass, Scale, Heart } from 'lucide-react';

// Fix: Using a type-casted alias for motion to bypass environment-specific type errors for motion props.
const m = motion as any;

interface ResponsibleSupportProps {
  tone?: EmotionalTone;
  detectsDistress?: boolean;
}

/**
 * SISTEMA RECTOR DE CUIDADO INSTITUCIONAL
 * Versión 1.0 Estable y Auditada.
 * Este componente gestiona la ética de la acogida y la ruta de orientación humana.
 */
const ResponsibleSupport: React.FC<ResponsibleSupportProps> = ({ tone, detectsDistress = false }) => {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto space-y-16 animate-fade-in" aria-labelledby="support-title">
      
      <header className="max-w-3xl mx-auto text-center space-y-6">
        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center gap-4 opacity-20"
        >
          <div className="w-12 h-px bg-azul-noche"></div>
          <div className="p-2 bg-azul-noche text-dorado-suave rounded-full">
             <Landmark size={18} strokeWidth={1.2} />
          </div>
          <div className="w-12 h-px bg-azul-noche"></div>
        </m.div>

        <div className="space-y-2">
          <h2 id="support-title" className="text-xl font-bold text-azul-noche serif-font italic tracking-tight">
            {normalizeSystemText('Sistema rector de cuidado institucional')}
          </h2>
          <p className="text-xs font-semibold text-dorado-suave italic tracking-wide">
            {normalizeSystemText('Ética · lenguaje · soberanía del ser')}
          </p>
        </div>

        <div className="space-y-6">
            <p className="text-base text-azul-noche/70 serif-font italic leading-relaxed">
            {detectsDistress
                ? normalizeSpanishText(
                    'Su relato manifiesta una densidad emocional profunda que merece una escucha atenta. La palabra es un refugio necesario, pero el acompañamiento humano institucional brinda una mayor seguridad en este tránsito. El sistema rector le invita a considerar un diálogo con el equipo de orientación escolar de su institución.'
                )
                : normalizeSpanishText(
                    'Este recinto asegura que su palabra sea recibida con la dignidad institucional que su proceso merece. El cuidado de su sentir es un acto de soberanía sobre su propia historia. El sistema realiza un acompañamiento simbólico y lingüístico, ordenando la experiencia sin sustituir la presencia humana protectora.'
                )}
            </p>
        </div>

        <div className="flex justify-center flex-wrap gap-4 pt-4">
          <span className={`px-5 py-2 text-[10px] font-bold italic rounded-full border transition-all ${
            detectsDistress
              ? 'border-rosa-ceniza/40 text-rosa-ceniza bg-rosa-ceniza/5'
              : 'border-azul-noche/10 text-azul-noche/40'
          }`}>
            {detectsDistress
              ? normalizeSystemText('Atención institucional sugerida')
              : normalizeSystemText('Clima de aula estable')}
          </span>

          <span className="px-5 py-2 text-[10px] font-bold italic border border-dorado-suave/20 text-dorado-suave bg-white/40 rounded-full shadow-sm">
            {tone
              ? normalizeSystemText(`Resonancia: ${tone}`)
              : normalizeSystemText('Acogida institucional activa')}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            level: 'Nivel 1: Preventivo',
            icon: <Bookmark size={16} className="text-verde-salvia/70" />,
            title: 'Autocuidado narrativo',
            desc: 'Escritura autónoma y autorregulación. El portal actúa como espejo lingüístico y la palabra es refugio soberano.'
          },
          {
            level: 'Nivel 2: Orientativo',
            icon: <Compass size={16} className="text-dorado-suave/70" />,
            title: 'Diálogo pedagógico',
            desc: 'Se sugiere compartir la reflexión con un docente guía para integrar el sentir con el aprendizaje ciudadano.'
          },
          {
            level: 'Nivel 3: Derivación',
            icon: <Scale size={16} className="text-rosa-ceniza/70" />,
            title: 'Apoyo profesional',
            desc: 'Ante una densidad emocional abrumadora, instamos a activar la ruta de orientación escolar presencial institucional.'
          }
        ].map((step, idx) => (
          <div 
            key={idx} 
            className="bg-white/50 p-8 rounded-2xl border border-azul-noche/5 space-y-4 shadow-sm flex flex-col items-center text-center group hover:bg-white transition-all duration-500"
          >
            <div className="p-3 bg-marfil-cosmico rounded-full mb-1 group-hover:scale-110 transition-transform">{step.icon}</div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-azul-noche/30 italic block">{step.level}</span>
              <h4 className="text-base font-bold serif-font italic text-azul-noche">{step.title}</h4>
              <p className="text-xs text-azul-noche/60 serif-font italic leading-relaxed">{normalizeSpanishText(step.desc)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/80 p-10 rounded-[2.5rem] border border-azul-noche/5 text-center space-y-6 shadow-sm">
        <div className="flex justify-center mb-1">
           <Heart size={24} strokeWidth={1} className="text-rosa-ceniza opacity-30" />
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-bold serif-font italic text-azul-noche">
            ¿Requiere un espacio de escucha humana?
          </h4>
          <p className="text-sm text-azul-noche/60 serif-font italic leading-relaxed max-w-xl mx-auto">
            {normalizeSpanishText('Si considera que su proceso emocional requiere una presencia atenta más allá del espejo digital, le recordamos que su institución dispone de profesionales dispuestos a acompañar su palabra.')}
          </p>
        </div>
        <button className="px-8 py-3.5 bg-azul-noche text-dorado-suave rounded-full font-bold text-xs italic transition-all shadow-md hover:bg-verde-salvia hover:text-white flex items-center gap-3 mx-auto">
          <PhoneCall size={14} />
          Solicitar orientación institucional
        </button>
      </div>

      <footer className="pt-10 text-center opacity-40 border-t border-azul-noche/5 flex flex-col items-center gap-4">
        <p className="text-[10px] text-azul-noche italic">Ser · Soberanía · Memoria · Casa común</p>
        <p className="text-[9px] font-medium italic text-azul-noche/40">
          Marco de referencia: MEN Colombia · Proyecto pedagógico · Versión 1.0
        </p>
      </footer>
    </section>
  );
};

export default ResponsibleSupport;
