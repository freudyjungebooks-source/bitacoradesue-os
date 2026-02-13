import React from 'react';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import { CheckCircle, ClipboardList, Clock } from 'lucide-react';
import { DreamEntry } from '../types';

interface IntegrationTableProps {
  rows?: DreamEntry[];
}

const IntegrationTable: React.FC<IntegrationTableProps> = () => {
  const matrixData = [
    {
      paso: "I. Inscripción",
      actividad: "Escritura soberana",
      estandar: "Produzco textos con coherencia y cohesión.",
      dba: "Escribe textos narrativos imaginarios.",
      indicador: "Claridad narrativa"
    },
    {
      paso: "II. Exploración",
      actividad: "Lupa simbólica",
      estandar: "Reconozco el valor simbólico del lenguaje.",
      dba: "Infiere significados no explícitos.",
      indicador: "Ampliación léxica"
    },
    {
      paso: "III. Conexión",
      actividad: "Reflexión sistémica",
      estandar: "Valoro la diversidad cultural and familiar.",
      dba: "Fortalece su identidad desde el lenguaje.",
      indicador: "Vínculo biográfico"
    },
    {
      paso: "IV. Integración",
      actividad: "Evidencia formativa",
      estandar: "Asumo postura crítica frente al lenguaje.",
      dba: "Expresa postura reflexiva en escritos.",
      indicador: "Compromiso ético"
    }
  ];

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-azul-noche text-white text-[10px] font-bold italic">
              <th className="px-8 py-6 border-b border-white/10 tracking-wide">Fase operativa</th>
              <th className="px-8 py-6 border-b border-white/10 tracking-wide">Estándar / DBA</th>
              <th className="px-8 py-6 border-b border-white/10 tracking-wide">Indicador de proceso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-azul-noche/5">
            {matrixData.map((row, index) => (
              <tr key={index} className="hover:bg-marfil-cosmico/20 transition-colors">
                <td className="px-8 py-8">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-dorado-suave italic tracking-tighter">{row.paso}</span>
                    <h4 className="text-xs font-bold text-azul-noche italic">{normalizeSystemText(row.actividad)}</h4>
                  </div>
                </td>
                <td className="px-8 py-8">
                  <div className="space-y-2 max-w-xs">
                    <p className="text-[11px] text-azul-noche/60 serif-font italic leading-snug">"{row.estandar}"</p>
                    <span className="text-[9px] font-bold text-verde-salvia italic block">{row.dba}</span>
                  </div>
                </td>
                <td className="px-8 py-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={10} className="text-dorado-suave" />
                    <span className="text-[10px] font-bold text-azul-noche/60 italic">{row.indicador}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-marfil-cosmico/30 p-10 border-t border-azul-noche/5 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <header className="flex items-center gap-3 text-azul-noche opacity-60">
            <ClipboardList size={16} />
            <h4 className="text-xs font-bold italic tracking-wide">Criterios de valoración</h4>
          </header>
          <div className="space-y-4">
            {[
              { c: "Soberanía", d: "El autor mantiene el control total de su relato y sentido." },
              { c: "Trazabilidad", d: "Relación clara entre la imagen soñada y el concepto curricular." },
              { c: "Presencia", d: "Participación consciente y ritual en el espacio de aula." }
            ].map((r, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-[10px] font-bold text-dorado-suave serif-font">0{i+1}</span>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-azul-noche italic">{r.c}</p>
                  <p className="text-[10px] text-azul-noche/40 italic">{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/40 p-8 rounded-3xl border border-azul-noche/5 flex flex-col justify-center text-center space-y-4">
          <Clock size={24} className="mx-auto text-azul-noche opacity-10" />
          <p className="text-xs text-azul-noche/50 serif-font italic leading-relaxed">
            "Este sistema garantiza que la evaluación sea un acto de cuidado y reconocimiento, no de fiscalización del mundo interior."
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationTable;