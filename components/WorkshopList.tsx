
import React, { useEffect, useState } from 'react';
import { Workshop } from '../types';
import WorkshopCard from './WorkshopCard';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';

interface WorkshopListProps {
  workshops: Workshop[];
  onDelete: (id: string) => void;
  onUpdate: (updated: Workshop) => void;
}

const WorkshopList: React.FC<WorkshopListProps> = ({ workshops, onDelete, onUpdate }) => {
  const [models, setModels] = useState<any[]>([]);

  useEffect(() => {
    fetch('data/workshopModel.json')
      .then(res => res.json())
      .then(data => setModels(Array.isArray(data) ? data : [data]))
      .catch(err => console.error("Error cargando modelos de taller:", err));
  }, []);

  return (
    <div className="space-y-32 animate-fade-in max-w-6xl mx-auto px-6 pb-40">
      <header className="text-center space-y-10 mb-32">
        <div className="flex justify-center gap-4 opacity-20 mb-6">
          <div className="w-12 h-px bg-azul-noche"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-azul-noche"></div>
          <div className="w-12 h-px bg-azul-noche"></div>
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-bold text-azul-noche serif-font italic tracking-tighter">
          {normalizeSystemText('arquitectura de talleres simbólicos')}
        </h2>
        
        <p className="text-azul-noche/40 serif-font italic text-xl max-w-2xl mx-auto leading-relaxed">
          {normalizeSpanishText('"el conocimiento no es algo que se posee, es algo que se habita colectivamente desde el Sueño, la Memoria y la Soberanía del Ser. Narrar es construir mundo."')}
        </p>
      </header>
      
      <section className="space-y-24">
        <div className="text-center space-y-4">
          <h3 className="text-[10px] font-bold text-dorado-suave tracking-[0.4em] uppercase italic">
            {normalizeSystemText('bitácora de sesiones narrativas')}
          </h3>
          <div className="w-8 h-px bg-dorado-suave/30 mx-auto"></div>
        </div>

        {workshops.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-azul-noche/10 rounded-[5rem] bg-marfil-cósmico/30 texture-grain">
            <p className="text-azul-noche/25 serif-font italic text-xl">
              {normalizeSpanishText('aún no hay propuestas de taller inscritas. invita a la palabra a manifestarse.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-24">
            {workshops.map((workshop) => (
              <WorkshopCard 
                key={workshop.id} 
                workshop={workshop} 
                onDelete={onDelete} 
                onUpdate={onUpdate}
              />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-20 pt-20 border-t border-azul-noche/5">
        <div className="text-center space-y-6">
          <h3 className="text-[10px] font-bold text-verde-salvia tracking-[0.4em] uppercase italic">
            {normalizeSystemText('modelos fundacionales de la palabra')}
          </h3>
          <p className="text-azul-noche/30 text-xs italic serif-font max-w-lg mx-auto leading-relaxed">
            {normalizeSpanishText('estructuras de sentido para el encuentro con la imagen interior y el fortalecimiento de la capacidad de narrar y escuchar en comunidad.')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {models.map((model) => (
            <div key={model.id} className="bg-white/70 p-12 rounded-[4rem] border border-dorado-suave/10 shadow-sm hover:shadow-xl transition-all duration-1000 group flex flex-col justify-between relative overflow-hidden texture-grain">
              <div className="absolute top-0 right-0 w-24 h-24 bg-verde-salvia/5 rounded-full -mr-12 -mt-12 group-hover:bg-verde-salvia/10 transition-colors"></div>
              
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="px-5 py-1.5 bg-verde-salvia/10 text-verde-salvia text-[9px] font-bold rounded-full tracking-widest border border-verde-salvia/20 italic">
                    {normalizeSystemText(model.grade)}
                  </span>
                  <span className="text-dorado-suave/20 group-hover:text-dorado-suave transition-colors">✦</span>
                </div>
                
                <h4 className="text-2xl font-bold text-azul-noche serif-font italic leading-tight group-hover:text-verde-salvia transition-colors">
                  {normalizeSpanishText(model.workshopTitle)}
                </h4>
                
                <p className="text-sm text-azul-noche/50 serif-font italic leading-relaxed line-clamp-3">
                  {normalizeSpanishText(model.humanObjectives)}
                </p>
              </div>
              
              <div className="mt-10 pt-6 border-t border-azul-noche/5 flex justify-between items-center relative z-10">
                <span className="text-[9px] font-bold text-azul-noche/25 italic tracking-tighter uppercase">
                  {normalizeSystemText(`Eje: ${model.centralSymbol}`)}
                </span>
                <span className="text-[9px] font-bold text-dorado-suave/40 italic">{model.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="pt-32 text-center opacity-20">
        <p className="text-[9px] font-bold text-azul-noche tracking-[0.5em] uppercase italic">
          Pedagogía de la Narración Soberana · Casa Común
        </p>
      </footer>
    </div>
  );
};

export default WorkshopList;
