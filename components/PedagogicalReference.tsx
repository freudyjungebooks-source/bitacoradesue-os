import React, { useState, useEffect } from 'react';
import { PEDAGOGICAL_FRAMEWORK } from '../utils/pedagogicalFramework';
import { normalizeSystemText } from '../utils/linguisticNormalizer';

interface PedagogicalReferenceProps {
  onClose: () => void;
}

const PedagogicalReference: React.FC<PedagogicalReferenceProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'guia' | 'itinerario' | 'evaluacion'>('guia');
  const [selectedLevel, setSelectedLevel] = useState<string>("1");
  const [evaluationData, setEvaluationData] = useState<any>(null);
  const [projectGuide, setProjectGuide] = useState<any>(null);

  const framework = PEDAGOGICAL_FRAMEWORK[selectedLevel];

  useEffect(() => {
    fetch('data/evaluationProtocol.json')
      .then(res => res.json())
      .then(data => setEvaluationData(data))
      .catch(err => console.error("Error cargando protocolo:", err));

    fetch('data/projectGuide.json')
      .then(res => res.json())
      .then(data => setProjectGuide(data))
      .catch(err => console.error("Error cargando guía del proyecto:", err));
  }, []);

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-azul-noche/95 backdrop-blur-3xl animate-fade-in" onClick={onClose}></div>
      
      <div className="relative bg-marfil-cósmico rounded-[5rem] w-full max-w-7xl p-10 sm:p-20 shadow-2xl animate-fade-in-up border border-white/40 overflow-y-auto no-scrollbar max-h-[92vh] texture-grain">
        <button onClick={onClose} className="absolute top-12 right-12 text-azul-noche/30 hover:text-azul-noche p-6 border border-azul-noche/10 rounded-full transition-ritual hover:rotate-90 bg-white/50">✕</button>

        <header className="text-center mb-16 space-y-8">
          <h3 className="text-4xl font-bold text-azul-noche serif-font italic tracking-tight">
            {normalizeSystemText('Referencia Pedagógica Institucional')}
          </h3>
          
          <nav className="flex justify-center gap-12 mt-12 border-b border-azul-noche/5 pb-6">
            {[
              { id: 'guia', label: 'Proyecto Maestro' },
              { id: 'itinerario', label: 'Ruta por Grados' },
              { id: 'evaluacion', label: 'Evaluación Formativa' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-[12px] font-bold tracking-tight border-b-2 pb-2 transition-ritual ${activeTab === tab.id ? 'text-azul-noche border-dorado-suave' : 'text-azul-noche/30 border-transparent'}`}
              >
                {normalizeSystemText(tab.label)}
              </button>
            ))}
          </nav>
        </header>

        <div className="animate-fade-in py-8">
          {activeTab === 'guia' && projectGuide && (
            <div className="max-w-5xl mx-auto space-y-20 pb-20">
              <header className="text-center space-y-4">
                <h4 className="text-5xl font-bold text-azul-noche serif-font italic tracking-tighter">{projectGuide.projectTitle}</h4>
                <p className="text-xl text-azul-noche/50 serif-font italic">{projectGuide.subtitle}</p>
                <div className="w-20 h-px bg-dorado-suave mx-auto mt-8"></div>
              </header>

              <div className="grid grid-cols-1 gap-20">
                <section className="bg-white/60 p-16 rounded-[4rem] border border-dorado-suave/10 space-y-6">
                  <h5 className="text-[11px] font-bold text-verde-salvia uppercase tracking-[0.4em]">{projectGuide.framework.sectionA.title}</h5>
                  <p className="text-xl text-azul-noche/80 serif-font italic leading-relaxed">{projectGuide.framework.sectionA.content}</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <section className="bg-azul-noche p-12 rounded-[4rem] text-dorado-suave space-y-8">
                    <h5 className="text-[10px] font-bold opacity-40 uppercase tracking-[0.4em]">{projectGuide.framework.sectionB.title}</h5>
                    <p className="text-xl italic serif-font mb-6">{projectGuide.framework.sectionB.general}</p>
                    <div className="space-y-4 pt-6 border-t border-dorado-suave/10">
                      {projectGuide.framework.sectionB.cycles.map((cycle: any, i: number) => (
                        <div key={i} className="space-y-1">
                          <p className="text-[9px] font-bold uppercase opacity-30 tracking-widest">{cycle.range}</p>
                          <p className="text-sm italic opacity-80">{cycle.objective}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-white/80 p-12 rounded-[4rem] border border-dorado-suave/10 space-y-8">
                    <h5 className="text-[10px] font-bold text-azul-noche/30 uppercase tracking-[0.4em]">{projectGuide.framework.sectionE.title}</h5>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                      {projectGuide.framework.sectionE.steps.map((step: any, i: number) => (
                        <div key={i} className="space-y-1 border-l-2 border-dorado-suave/20 pl-4">
                          <p className="text-[9px] font-bold text-verde-salvia uppercase">{step.grade}: {step.symbol}</p>
                          <p className="text-[11px] text-azul-noche/60 italic">{step.focus}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <section className="bg-marfil-cósmico/40 p-16 rounded-[4rem] border border-azul-noche/5 grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <h5 className="text-[11px] font-bold text-azul-noche/30 uppercase tracking-[0.4em]">{projectGuide.framework.sectionF.title}</h5>
                    <ul className="space-y-4">
                      {projectGuide.framework.sectionF.steps.map((step: string, i: number) => (
                        <li key={i} className="text-lg text-azul-noche/70 serif-font italic flex gap-4">
                          <span className="text-dorado-suave">✦</span> {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-8">
                    <h5 className="text-[11px] font-bold text-azul-noche/30 uppercase tracking-[0.4em]">{projectGuide.framework.sectionJ.title}</h5>
                    <ul className="space-y-4">
                      {projectGuide.framework.sectionJ.rules.map((rule: string, i: number) => (
                        <li key={i} className="text-sm text-rosa-ceniza font-bold italic flex gap-4">
                          <span className="opacity-40">⌬</span> {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === 'itinerario' && (
            <div className="space-y-12">
               <div className="flex flex-wrap justify-center gap-4 mb-12">
                {Object.keys(PEDAGOGICAL_FRAMEWORK).sort((a,b) => parseInt(a) - parseInt(b)).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLevel(key)}
                    className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-ritual border ${
                      selectedLevel === key ? 'bg-azul-noche text-dorado-suave border-azul-noche shadow-lg' : 'text-azul-noche/30 border-azul-noche/5 hover:bg-white/50'
                    }`}
                  >
                    {PEDAGOGICAL_FRAMEWORK[key].gradeRange}
                  </button>
                ))}
              </div>

              {framework && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="bg-white/60 p-12 rounded-[4rem] border border-dorado-suave/10 space-y-8">
                    <header className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-verde-salvia uppercase tracking-widest">Capacidades Emocionales</span>
                        <span className="text-[10px] text-azul-noche/30 italic">{framework.ageRangeLabel}</span>
                      </div>
                      <h4 className="text-xl font-bold text-azul-noche serif-font italic leading-relaxed">{framework.emotionalCapacities}</h4>
                    </header>
                    <div className="space-y-4 pt-4 border-t border-azul-noche/5">
                      <h5 className="text-[10px] font-bold text-azul-noche/30 uppercase tracking-widest">Propósito Humano</h5>
                      <p className="text-2xl text-azul-noche serif-font italic leading-tight">{framework.humanObjective}</p>
                    </div>
                    <div className="bg-marfil-cósmico/30 p-8 rounded-[3rem] border border-azul-noche/5">
                        <h5 className="text-[10px] font-bold text-dorado-suave uppercase tracking-widest mb-4">Meta Lingüística</h5>
                        <p className="text-md italic text-azul-noche/80 leading-relaxed">{framework.linguisticObjective}</p>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="bg-white/60 p-10 rounded-[3.5rem] border border-dorado-suave/5">
                      <h5 className="text-[10px] font-bold text-dorado-suave uppercase tracking-widest mb-4">Escritura y Cuerpo</h5>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                           <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest">Papel</p>
                           <ul className="space-y-1">
                              {framework.writingActivities.map((act, i) => (
                                <li key={i} className="text-[11px] italic text-azul-noche/70">• {act}</li>
                              ))}
                           </ul>
                        </div>
                        <div className="space-y-3">
                           <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest">Gesto</p>
                           <ul className="space-y-1">
                              {framework.corporalActivities.map((act, i) => (
                                <li key={i} className="text-[11px] italic text-verde-salvia/80">• {act}</li>
                              ))}
                           </ul>
                        </div>
                      </div>
                    </div>
                    <div className="bg-azul-noche/5 p-10 rounded-[3.5rem] border border-azul-noche/5">
                      <h5 className="text-[10px] font-bold text-azul-noche/40 uppercase tracking-widest mb-4">Resultados de Aprendizaje</h5>
                      <ul className="space-y-3">
                        {framework.learningOutcomes.map((outcome, i) => (
                          <li key={i} className="text-sm italic text-azul-noche/60 flex gap-2">
                            <span className="text-verde-salvia">✦</span> {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'evaluacion' && evaluationData && (
            <div className="max-w-6xl mx-auto space-y-16 animate-fade-in py-10">
              <header className="text-center space-y-6">
                <h4 className="text-3xl font-bold text-azul-noche serif-font italic">{evaluationData.evaluationPhilosophy}</h4>
                <div className="w-16 h-px bg-dorado-suave mx-auto"></div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {evaluationData.rubricsByCycle.map((rubric: any, i: number) => (
                  <div key={i} className="bg-white/60 p-10 rounded-[4rem] border border-dorado-suave/10 space-y-6 shadow-sm hover:shadow-xl transition-all">
                    <h5 className="text-[11px] font-bold text-verde-salvia uppercase tracking-widest border-b border-verde-salvia/20 pb-4">{rubric.name} <br/><span className="opacity-40 text-[9px]">{rubric.cycle}</span></h5>
                    <ul className="space-y-4">
                      {rubric.indicators.map((item: string, j: number) => (
                        <li key={j} className="text-sm text-azul-noche/60 italic leading-relaxed flex gap-3">
                          <span className="text-dorado-suave">◆</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-azul-noche/5 p-16 rounded-[5rem] border border-azul-noche/10 grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-6">
                  <h5 className="text-[10px] font-bold text-azul-noche/40 uppercase tracking-widest">Salvaguardas Éticas</h5>
                  <ul className="space-y-4">
                      {evaluationData.emotionalIndicators.map((item: string, i: number) => (
                        <li key={i} className="text-lg text-azul-noche/70 serif-font italic leading-relaxed flex gap-4">
                          <span className="text-rosa-ceniza">⌬</span> {item}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h5 className="text-[10px] font-bold text-azul-noche/40 uppercase tracking-widest">Observación del Guardián</h5>
                  <p className="text-xl text-azul-noche/70 serif-font italic leading-relaxed">
                    {evaluationData.teacherObservation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PedagogicalReference;