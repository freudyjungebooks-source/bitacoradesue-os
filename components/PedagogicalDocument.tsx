import React, { useState, useEffect } from 'react';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import IntegrationTable from './IntegrationTable';
import { 
  Landmark, BookOpen, Target, Workflow, Users, 
  ShieldAlert, ClipboardCheck, Layout, Globe, ChevronRight, Cpu 
} from 'lucide-react';

const PedagogicalDocument: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>('identidad');

  useEffect(() => {
    fetch('data/projectGuide.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error("Error cargando guía institucional:", err));
  }, []);

  if (!data) return (
    <div className="py-20 text-center opacity-20">
      <div className="w-8 h-8 border-2 border-azul-noche border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="serif-font italic">Cargando protocolo institucional...</p>
    </div>
  );

  const menu = [
    { id: 'identidad', label: 'Identidad y Objetivos', icon: Target },
    { id: 'fundamento', label: 'Marco Curricular', icon: BookOpen },
    { id: 'protocolo', label: 'Operación en Aula', icon: Workflow },
    { id: 'roles', label: 'Matriz de Roles', icon: Users },
    { id: 'etica', label: 'Ética y Evaluación', icon: ClipboardCheck }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-16 pb-40 animate-fade-in">
      <header className="text-center space-y-6">
        <div className="flex justify-center opacity-30 mb-2">
          <Landmark size={32} strokeWidth={1} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-azul-noche serif-font italic tracking-tight">
            {normalizeSystemText(data.identidad.titulo)}
          </h1>
          <p className="text-xs font-bold text-dorado-suave tracking-wide italic">
            Documento técnico rector · Versión 1.0 Final
          </p>
        </div>
      </header>

      <nav className="flex flex-wrap justify-center gap-2 border-b border-azul-noche/5 pb-8">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center gap-3 px-6 py-2 rounded-full text-[10px] font-bold italic transition-all border ${
              activeSection === item.id
                ? 'bg-azul-noche text-dorado-suave border-azul-noche shadow-md'
                : 'bg-white/40 text-azul-noche/30 border-azul-noche/5 hover:border-dorado-suave/30'
            }`}
          >
            <item.icon size={12} />
            {normalizeSystemText(item.label)}
          </button>
        ))}
      </nav>

      <main className="animate-fade-in">
        {activeSection === 'identidad' && (
          <div className="space-y-12">
            <section className="bg-white/70 p-12 rounded-[3rem] border border-azul-noche/5 shadow-sm space-y-8">
              <header className="space-y-2">
                <span className="text-[10px] font-bold text-verde-salvia italic tracking-wide">Capítulo I</span>
                <h2 className="text-2xl font-bold text-azul-noche serif-font italic">Identidad del proyecto</h2>
              </header>
              <div className="space-y-6">
                <p className="text-lg text-azul-noche/70 serif-font italic leading-relaxed">
                  {normalizeSpanishText(data.identidad.sintesis)}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-azul-noche/5">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-azul-noche/40 italic tracking-wide">Objetivo general</h3>
                  <p className="text-sm font-semibold text-azul-noche/80 serif-font italic leading-relaxed">
                    {normalizeSpanishText(data.objetivos.general)}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-azul-noche/40 italic tracking-wide">Objetivos específicos</h3>
                  <ul className="space-y-2">
                    {data.objetivos.especificos.map((obj: string, i: number) => (
                      <li key={i} className="text-xs text-azul-noche/60 serif-font italic flex gap-3">
                        <span className="text-dorado-suave">✦</span> {normalizeSpanishText(obj)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeSection === 'fundamento' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Object.entries(data.fundamento).map(([key, value], i) => (
                <div key={key} className="p-10 bg-white/60 rounded-3xl border border-azul-noche/5 space-y-4">
                  <span className="text-[9px] font-bold text-dorado-suave italic tracking-wide">Fundamento {key}</span>
                  <p className="text-xs text-azul-noche/70 serif-font italic leading-relaxed">
                    {normalizeSpanishText(value as string)}
                  </p>
                </div>
              ))}
            </div>
            <section className="bg-white rounded-[3rem] border border-azul-noche/5 shadow-sm overflow-hidden">
               <header className="p-10 bg-azul-noche text-dorado-suave">
                  <h2 className="text-xl font-bold serif-font italic">Marco curricular y alineación MEN</h2>
                  <p className="text-xs opacity-50 italic">Estándares y Derechos Básicos de Aprendizaje (DBA)</p>
               </header>
               <IntegrationTable />
            </section>
          </div>
        )}

        {activeSection === 'protocolo' && (
          <div className="space-y-12">
            <header className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl font-bold text-azul-noche serif-font italic">Protocolo operativo en aula</h2>
              <p className="text-sm text-azul-noche/40 italic">Secuencia metodológica por sesión institucional.</p>
            </header>
            <div className="bg-white/80 rounded-[3rem] border border-azul-noche/5 shadow-sm overflow-hidden">
              {data.protocolo.map((step: any, i: number) => (
                <div key={i} className={`flex flex-col md:flex-row items-start md:items-center gap-8 p-10 ${i !== data.protocolo.length - 1 ? 'border-b border-azul-noche/5' : ''}`}>
                  <div className="flex items-center gap-6 min-w-[140px]">
                    <span className="text-[10px] font-bold text-verde-salvia bg-verde-salvia/5 px-4 py-1.5 rounded-full whitespace-nowrap">{step.duracion}</span>
                    <ChevronRight size={14} className="text-azul-noche/20 hidden md:block" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-azul-noche italic">{normalizeSystemText(step.fase)}</h3>
                    <p className="text-sm text-azul-noche/60 serif-font italic leading-relaxed">{normalizeSpanishText(step.descripcion)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'roles' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(data.roles).map(([role, actions]: [string, any], i) => (
              <div key={role} className="bg-white/60 p-10 rounded-[3rem] border border-azul-noche/5 space-y-8 flex flex-col shadow-sm">
                <header className="text-center space-y-2">
                  <div className="w-10 h-10 bg-marfil-cosmico rounded-2xl flex items-center justify-center mx-auto text-azul-noche">
                    {role === 'docente' ? <Users size={18} /> : role === 'estudiante' ? <Layout size={18} /> : <Cpu size={18} className="text-dorado-suave" />}
                  </div>
                  <h3 className="text-xs font-bold text-azul-noche italic tracking-wide">{normalizeSystemText(role)}</h3>
                </header>
                <div className="space-y-6 flex-1">
                   {Object.entries(actions).map(([actionKey, actionValue]) => (
                     <div key={actionKey} className="space-y-1">
                        <span className="text-[9px] font-bold text-azul-noche/20 italic tracking-tighter">{actionKey.replace('_', ' ')}</span>
                        <p className="text-xs text-azul-noche/70 serif-font italic leading-relaxed">{normalizeSpanishText(actionValue as string)}</p>
                     </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'etica' && (
          <div className="space-y-12">
            <section className="bg-rosa-ceniza/5 p-12 rounded-[3.5rem] border border-rosa-ceniza/10 space-y-10">
              <header className="flex items-center gap-4 text-rosa-ceniza">
                <ShieldAlert size={24} />
                <h2 className="text-xl font-bold serif-font italic">Manejo ético y límites pedagógicos</h2>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-azul-noche italic">Declaración</h4>
                  <p className="text-xs text-azul-noche/60 serif-font italic leading-relaxed">{normalizeSpanishText(data.etica.declaracion)}</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-azul-noche italic">Protocolo</h4>
                  <p className="text-xs text-azul-noche/60 serif-font italic leading-relaxed">{normalizeSpanishText(data.etica.protocolo_riesgo)}</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-azul-noche italic">Privacidad</h4>
                  <p className="text-xs text-azul-noche/60 serif-font italic leading-relaxed">{normalizeSpanishText(data.etica.privacidad)}</p>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white/60 p-12 rounded-[3rem] border border-azul-noche/5 space-y-8">
                 <h2 className="text-lg font-bold text-azul-noche serif-font italic">Sistema de evaluación formativa</h2>
                 <p className="text-sm text-azul-noche/70 serif-font italic leading-relaxed">{normalizeSpanishText(data.evaluacion.sistema)}</p>
                 <div className="space-y-4 pt-6 border-t border-azul-noche/5">
                    <h4 className="text-[9px] font-bold text-azul-noche/30 italic tracking-wide">Evidencias verificables</h4>
                    <div className="flex flex-wrap gap-2">
                       {data.evaluacion.evidencias.map((ev: string, i: number) => (
                         <span key={i} className="px-4 py-1 bg-marfil-cosmico text-[9px] font-bold text-azul-noche/60 italic border border-azul-noche/5 rounded-full">
                           {normalizeSystemText(ev)}
                         </span>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="bg-azul-noche p-12 rounded-[3rem] text-dorado-suave space-y-8">
                 <h2 className="text-lg font-bold serif-font italic text-white">Versión mínima y proyección</h2>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <span className="text-[9px] font-bold opacity-40 tracking-wide italic">MVP</span>
                       <p className="text-sm italic opacity-80 leading-relaxed">{normalizeSpanishText(data.implementacion.mvp)}</p>
                    </div>
                    <div className="space-y-2">
                       <span className="text-[9px] font-bold opacity-40 tracking-wide italic">Proyección futura</span>
                       <p className="text-sm italic opacity-80 leading-relaxed">{normalizeSpanishText(data.implementacion.proyeccion)}</p>
                    </div>
                 </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="pt-20 border-t border-azul-noche/5 text-center opacity-40 flex flex-col items-center gap-4">
        <p className="text-[10px] text-azul-noche italic">Ser · Soberanía · Memoria · Casa común</p>
        <Globe size={14} strokeWidth={1} />
        <p className="text-[8px] font-medium italic">Proyecto pedagógico de escritura consciente · Versión 1.0</p>
      </footer>
    </div>
  );
};

export default PedagogicalDocument;