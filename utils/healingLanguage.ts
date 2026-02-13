
import { AgeGroup } from '../types';

interface HealingDictionary {
  welcome: string;
  saving: string;
  error: string;
  empty: string;
  distress: string;
}

const HEALING_MAP: Record<AgeGroup, HealingDictionary> = {
  infancia: {
    welcome: "Este es tu rincón secreto. Aquí tus palabras están protegidas como en un nido.",
    saving: "Estamos guardando tu historia con mucho cuidado, como un tesoro...",
    error: "El portal está descansando un poquito. Tu palabra no se ha perdido, solo espera un momento.",
    empty: "¿Qué colores viste hoy en tus sueños?",
    distress: "Sentir esto es natural. Tu palabra es una mano amiga que te acompaña."
  },
  adolescencia: {
    welcome: "Tu voz importa. Este es un espacio libre de juicios para que explores quién eres.",
    saving: "Recibiendo tu relato con respeto. El sistema está dando espacio a tu voz...",
    error: "Hubo una pequeña interrupción en el camino. No te preocupes, tu escritura está segura.",
    empty: "No hay prisa. El silencio también es una forma de escucharse.",
    distress: "Nombrar lo que duele es el primer paso para hacerlo más liviano. Estamos aquí."
  },
  jóvenes: {
    welcome: "La escritura es un acto de soberanía. Bienvenido a tu bitácora de navegación personal.",
    saving: "Procesando la densidad de tu palabra. Guardando con rigor y ética...",
    error: "El sistema ha encontrado una pausa técnica. Tu texto permanece intacto en este espacio.",
    empty: "¿Qué tensiones o luces habitan hoy tu pensamiento?",
    distress: "La complejidad de lo que sientes merece ser escrita. La bitácora es tu refugio ético."
  },
  // Added adultos group to complete AgeGroup record
  adultos: {
    welcome: "La palabra es el espejo del alma madura. Bienvenido a su espacio de reflexión profunda.",
    saving: "Integrando su experiencia en el tejido de la bitácora. Guardando con respeto absoluto...",
    error: "El portal experimenta una latencia técnica. Su legado escrito permanece bajo resguardo.",
    empty: "¿Qué hilos de sentido busca tejer hoy a través de su memoria?",
    distress: "Incluso en la madurez, la palabra es un bálsamo. Este espacio honra su proceso."
  }
};

export const getHealingVoice = (age: AgeGroup, context: keyof HealingDictionary): string => {
  return HEALING_MAP[age][context];
};
