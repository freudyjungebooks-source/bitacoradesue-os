
import React from 'react';
import { AgeGroup } from '../types';
import { getHealingVoice } from '../utils/healingLanguage';

interface HealingVoiceProps {
  ageGroup: AgeGroup;
  context: 'welcome' | 'saving' | 'error' | 'empty' | 'distress';
  isActive: boolean;
}

const HealingVoice: React.FC<HealingVoiceProps> = ({ ageGroup, context, isActive }) => {
  if (!isActive) return null;

  return (
    <div className="animate-fade-in py-8 px-12 bg-white/60 backdrop-blur-md rounded-[3rem] border border-verde-salvia/20 shadow-xl flex items-center gap-6 max-w-2xl mx-auto">
      <div className="w-3 h-3 bg-verde-salvia rounded-full animate-pulse shadow-[0_0_15px_rgba(143,174,158,0.5)]"></div>
      <p className="serif-font italic text-azul-noche/70 text-lg leading-relaxed">
        {getHealingVoice(ageGroup, context)}
      </p>
    </div>
  );
};

export default HealingVoice;
