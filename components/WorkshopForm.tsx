
import React, { useState, useEffect } from 'react';
import { Workshop } from '../types';
import { generateWorkshop } from '../services/geminiService';
import { normalizeSpanishText } from '../utils/linguisticNormalizer';

interface WorkshopFormProps {
  onSave: (workshop: Workshop) => void;
  onErrorMessage: (msg: string) => void;
  onContentChange?: (content: string) => void;
}

const WorkshopForm: React.FC<WorkshopFormProps> = ({ onSave, onErrorMessage, onContentChange }) => {
  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (onContentChange) onContentChange(content);
  }, [content, onContentChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isProcessing) return;
    setIsProcessing(true);
    
    try {
      const workshop = await generateWorkshop(content);
      onSave({ ...workshop, originalContent: content });
    } catch (error) {
      onErrorMessage(normalizeSpanishText("el proceso de creación tomó una pausa. por favor, intenta de nuevo en un momento."));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in-up">
      <div className="text-center space-y-4">
        <h3 className="text-[11px] font-bold text-verde-salvia tracking-[0.2em] italic uppercase">organizar el encuentro</h3>
        <p className="text-azul-noche/40 serif-font text-lg italic max-w-lg mx-auto leading-relaxed">
          "educar es acompañar procesos. cuenta tus ideas para el taller y buscaremos juntos el hilo de la palabra."
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="relative group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={normalizeSpanishText("escribe tus intenciones para el taller... el orden no importa, solo el sentir del aprendizaje.")}
            className="w-full h-[25rem] p-12 text-azul-noche bg-white/40 border border-dorado-suave/10 rounded-[4rem] focus:ring-[15px] focus:ring-dorado-suave/5 focus:bg-white/80 focus:outline-none resize-none serif-font leading-relaxed text-2xl transition-ritual shadow-inner placeholder:opacity-20"
            disabled={isProcessing}
          />
          <div className="absolute bottom-10 right-10 flex items-center gap-4 opacity-20">
            <span className="text-[10px] font-bold text-azul-noche italic">escucha activa</span>
            <div className={`w-2 h-2 rounded-full bg-verde-salvia ${isProcessing ? 'animate-ping' : ''}`}></div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <button
            type="submit"
            disabled={!content.trim() || isProcessing}
            className={`px-24 py-6 rounded-full font-bold text-[13px] tracking-widest transition-ritual shadow-2xl ${
              isProcessing || !content.trim() ? 'bg-stone-100 text-stone-300' : 'bg-azul-noche text-dorado-suave hover:bg-verde-salvia hover:text-white'
            }`}
          >
            {isProcessing ? normalizeSpanishText('organizando...') : normalizeSpanishText('crear taller')}
          </button>
          
          <p className="text-[9px] font-bold text-azul-noche/20 tracking-[0.3em] italic">
            {normalizeSpanishText('la palabra es el mapa del viaje interior')}
          </p>
        </div>
      </form>
    </div>
  );
};

export default WorkshopForm;
