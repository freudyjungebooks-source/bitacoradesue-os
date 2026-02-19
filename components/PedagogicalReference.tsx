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

    fetch('/data/evaluationProtocol.json')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar evaluationProtocol');
        return res.json();
      })
      .then(data => setEvaluationData(data))
      .catch(err => console.error("Error cargando protocolo:", err));

    fetch('/data/projectGuide.json')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar projectGuide');
        return res.json();
      })
      .then(data => setProjectGuide(data))
      .catch(err => console.error("Error cargando guía del proyecto:", err));

  }, []);

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-azul-noche/95 backdrop-blur-3xl animate-fade-in"
        onClick={onClose}
      ></div>

      <div className="relative bg-marfil-cósmico rounded-[5rem] w-full max-w-7xl p-10 sm:p-20 shadow-2xl animate-fade-in-up border border-white/40 overflow-y-auto no-scrollbar max-h-[92vh] texture-grain">
        <button
          onClick={onClose}
          className="absolute top-12 right-12 text-azul-noche/30 hover:text-azul-noche p-6 border border-azul-noche/10 rounded-full transition-ritual hover:rotate-90 bg-white/50"
        >
          ✕
        </button>

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
                className={`text-[12px] font-bold tracking-tight border-b-2 pb-2 transition-ritual ${
                  activeTab === tab.id
                    ? 'text-azul-noche border-dorado-suave'
                    : 'text-azul-noche/30 border-transparent'
                }`}
              >
                {normalizeSystemText(tab.label)}
              </button>
            ))}
          </nav>
        </header>

        <div className="animate-fade-in py-8">

          {activeTab === 'guia' && projectGuide && (
            <div className="text-center text-azul-noche">
              <h4 className="text-3xl font-bold serif-font italic">
                {projectGuide.projectTitle}
              </h4>
              <p className="text-lg italic opacity-70 mt-4">
                {projectGuide.subtitle}
              </p>
            </div>
          )}

          {activeTab === 'itinerario' && framework && (
            <div className="text-center text-azul-noche space-y-6">
              <h4 className="text-2xl font-bold serif-font italic">
                {framework.gradeRange}
              </h4>
              <p className="italic">{framework.humanObjective}</p>
            </div
