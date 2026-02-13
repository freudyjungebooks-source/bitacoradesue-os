
import React, { useState } from 'react';
import { DreamEntry, AgeGroup, WritingType, UserRole, GradeLevel } from '../types';
import { accompanyDream } from '../services/geminiService';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import HealingVoice from './HealingVoice';
import EmotionalGrids from './EmotionalGrids';
import { motion } from 'framer-motion';

// Fix: Using a type-casted alias for motion to bypass environment-specific type errors for motion props.
const m = motion as any;

interface DreamFormProps {
  onSave: (entry: DreamEntry) => void;
  onErrorMessage: (msg: string) => void;
  ageGroup: AgeGroup;
  userRole: UserRole;
  gradeLevel: GradeLevel;
  studentCode: string;
}

const DreamForm: React.FC<DreamFormProps> = ({ onSave, onErrorMessage, ageGroup, userRole, gradeLevel, studentCode }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedGrid, setSelectedGrid] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const studentCategories: { id: WritingType; label: string; icon: string }[] = [
    { id: 'sueño', label: 'Sueño', icon: '🌙' },
    { id: 'diario', label: 'Diario', icon: '☀️' },
    { id: 'emoción', label: 'Emoción', icon: '🤍' },
    { id: 'recuerdo', label: 'Recuerdo', icon: '📜' }
  ];

  const categories = studentCategories;
  const [writingType, setWritingType] = useState<WritingType>(categories[0].id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || isProcessing) return;
    setIsProcessing(true);

    try {
      const result = await accompanyDream({ title, content, writingType, ageGroup });
      
      const newEntry: DreamEntry = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        title,
        content,
        metadata: {
          studentCode,
          userRole,
          gradeLevel,
          ageGroup,
          writingType,
          academicArea: 'General'
        },
        readingLayer: result
      };

      onSave(newEntry);
      setTitle('');
      setContent('');
    } catch (err) {
      onErrorMessage(normalizeSpanishText("Se presentó una pausa técnica. Su palabra permanece a salvo localmente."));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    // Fix: Using m.div alias to bypass framer-motion type errors
    <m.div 
      className="space-y-12 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <header className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-azul-noche/5 pb-6">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-xs font-semibold text-azul-noche/40 italic">Inscripción en bitácora</p>
          <h3 className="text-lg font-bold text-azul-noche serif-font italic">{studentCode} — {gradeLevel}</h3>
        </div>
        <HealingVoice 
          ageGroup={ageGroup} 
          context={isProcessing ? 'saving' : (content.length === 0 ? 'empty' : 'welcome')} 
          isActive={true} 
        />
      </header>
      
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={normalizeSystemText('Título de su relato...')}
            className="bg-transparent border-b border-azul-noche/10 p-2 text-lg font-bold text-azul-noche serif-font focus:outline-none focus:border-verde-salvia transition-all placeholder:text-azul-noche/10 w-full"
            disabled={isProcessing}
          />
          
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setWritingType(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold italic transition-all flex items-center gap-2 border ${
                  writingType === cat.id 
                    ? 'bg-azul-noche text-dorado-suave border-azul-noche' 
                    : 'bg-white/60 text-azul-noche/40 border-azul-noche/5 hover:border-dorado-suave/20'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                {normalizeSystemText(cat.label)}
              </button>
            ))}
          </div>
        </div>

        <div className="relative group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={normalizeSpanishText('Habite este espacio con su palabra en primera persona...')}
            className="w-full h-80 bg-white/60 border border-azul-noche/5 rounded-xl p-8 text-base text-azul-noche/80 serif-font italic leading-relaxed focus:outline-none resize-none transition-all focus:border-dorado-suave/20"
            disabled={isProcessing}
          />
          <div className="absolute bottom-6 right-8 flex items-center gap-3 opacity-30">
            <span className="text-xs font-semibold text-azul-noche italic">Recinto soberano</span>
            <div className={`w-2 h-2 rounded-full bg-verde-salvia ${isProcessing ? 'animate-pulse' : ''}`}></div>
          </div>
        </div>

        {content.length > 20 && (
          // Fix: Using m.div alias to bypass framer-motion type errors
          <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-6">
            <EmotionalGrids selectedId={selectedGrid} onSelect={setSelectedGrid} />
          </m.div>
        )}

        <div className="flex flex-col items-center gap-6 pt-6">
          <button
            type="submit"
            disabled={!title.trim() || !content.trim() || isProcessing}
            className={`px-16 py-4 rounded-full font-bold text-sm italic transition-all shadow-md ${
              isProcessing || !title.trim() || !content.trim() 
                ? 'bg-stone-100 text-stone-300 cursor-not-allowed' 
                : 'bg-azul-noche text-dorado-suave hover:bg-verde-salvia hover:text-white'
            }`}
          >
            {isProcessing ? normalizeSystemText('Inscribiendo...') : normalizeSystemText('Sembrar palabra')}
          </button>
          <p className="text-xs font-medium text-azul-noche/30 italic text-center max-w-xs leading-relaxed">
             La palabra inscrita se custodia con respeto absoluto en la bóveda institucional del ser.
          </p>
        </div>
      </form>
    </m.div>
  );
};

export default DreamForm;
