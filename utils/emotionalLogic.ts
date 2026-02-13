
import { AgeGroup } from '../types';

export type EmotionalClimate = 'pérdida' | 'miedo' | 'alegría' | 'confusión' | 'esperanza' | 'neutral';

interface EmotionalFaro {
  climate: EmotionalClimate;
  message: string;
  pedagogicalReason: string;
}

const FAROS: Record<EmotionalClimate, string[]> = {
  pérdida: [
    "La tristeza suele aparecer cuando algo valioso está siendo comprendido.",
    "Honrar lo que ya no está es una forma de cuidar lo que fuimos.",
    "Tu palabra abraza el vacío y lo convierte en memoria."
  ],
  miedo: [
    "El temor es un guardián que intenta proteger lo que más valoras.",
    "Sentir miedo es reconocer que estamos ante algo grande.",
    "La palabra es una luz pequeña que ayuda a caminar en la niebla."
  ],
  alegría: [
    "La gratitud es el eco de un corazón que se siente en casa.",
    "Tu luz interior hoy se refleja en cada letra que escribes.",
    "Celebrar el instante es un acto de soberanía emocional."
  ],
  confusión: [
    "No saber es el primer paso para descubrir una nueva verdad.",
    "El caos de hoy es la semilla del orden que vendrá mañana.",
    "Lo que sientes tiene forma, aunque todavía no tenga nombre."
  ],
  esperanza: [
    "Tu voz proyecta un mañana donde el cuidado es posible.",
    "Escribir sobre el futuro es empezar a construirlo hoy.",
    "Hay una fuerza mansa en tu palabra que invita a seguir."
  ],
  neutral: [
    "El silencio de la página es un espacio fértil para tu voz.",
    "Cada palabra es un acto de presencia ética en el mundo.",
    "Escribir es escucharse a uno mismo con respeto."
  ]
};

export function detectEmotionalClimate(content: string): EmotionalClimate {
  const text = content.toLowerCase();
  if (/triste|perdí|adiós|solo|vacio|duele|lloro|ausencia/.test(text)) return 'pérdida';
  if (/miedo|asusta|temor|peligro|oscuro|tiemblo|ansia/.test(text)) return 'miedo';
  if (/feliz|alegre|risa|luz|brilla|amor|paz|disfruto/.test(text)) return 'alegría';
  if (/no sé|confuso|duda|perdido|enredo|raro|extraño/.test(text)) return 'confusión';
  if (/espero|sueño|mañana|crecer|cambio|fuerza|puedo/.test(text)) return 'esperanza';
  return 'neutral';
}

export function getEmotionalFaro(climate: EmotionalClimate): string {
  const options = FAROS[climate];
  return options[Math.floor(Math.random() * options.length)];
}
