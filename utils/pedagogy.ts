
/* Fix: Updated imports from types.ts including new pedagogical interfaces */
import { PedagogicalGrid, DreamReadingLayer, AgeGroup, FocusType, PedagogicalLevel } from '../types';

/**
 * Genera el conjunto completo de rejillas pedagógicas basándose en la lectura atenta.
 * Estas rejillas actúan como un mapa de observación técnica para el docente o el soñante.
 */
export function generateAllPedagogicalGrids(
  reading: DreamReadingLayer
): PedagogicalGrid[] {
  const grids: PedagogicalGrid[] = [];

  /* Fix: Correctly access emotionalDensity for determining pedagogical level through tecnica property */
  // 1. Decidir nivel técnico sugerido según la complejidad de la materia detectada
  const level: PedagogicalLevel =
    reading.tecnica?.emotionalDensity === 'baja'
      ? 'inicial'
      : reading.tecnica?.emotionalDensity === 'media'
      ? 'intermedio'
      : 'profundo';

  // 2. Decidir grupo biográfico sugerido basado en el nivel técnico
  const ageGroup: AgeGroup =
    level === 'inicial'
      ? 'infancia'
      : level === 'intermedio'
      ? 'adolescencia'
      : 'jóvenes';

  /* Fix: Handle optional anchors safely using optional chaining or default values */
  // 3. Selección de anclas para situar las preguntas (máximo 3)
  const anchors = (reading.anchors || []).slice(0, 3);

  // --- FOCO 1: EMOCIONAL (Siempre presente) ---
  grids.push({
    ageGroup,
    focus: 'emocional',
    level,
    anchorsUsed: anchors,
    guidingQuestions: [
      '¿Qué Emoción aparece con más fuerza en el Relato?',
      '¿En qué parte del Cuerpo se siente esta Palabra?',
      '¿Cómo cambia el clima del Sueño al nombrar lo que sientes?'
    ],
    evaluationCriteria: [
      'Reconoce emociones explícitas en el texto.',
      'Vincula el sentir con la narrativa del Ser.',
      'Expresa sensaciones con un lenguaje propio y digno.'
    ]
  });

  // --- FOCO 2: SIMBÓLICO (Si hay anclas concretas) ---
  if (anchors.length > 0) {
    grids.push({
      ageGroup,
      focus: 'simbólico',
      level,
      anchorsUsed: anchors,
      guidingQuestions: [
        '¿Qué Símbolo (objeto, lugar, animal) destaca en la Memoria?',
        '¿Qué protege o enseña ese elemento en el camino del Relato?',
        '¿Cómo se transforma la escena al interactuar con el Símbolo?'
      ],
      evaluationCriteria: [
        'Identifica el Símbolo central de su producción textual.',
        'Describe la función del Símbolo sin forzar interpretaciones técnicas.',
        'Integra el Símbolo en su DICCIONARIO SIMBÓLICO personal.'
      ]
    });
  }

  // --- FOCO 3: RELACIONAL (Vínculos y Alteridad) ---
  grids.push({
    ageGroup,
    focus: 'relacional',
    level,
    anchorsUsed: anchors,
    guidingQuestions: [
      '¿Quiénes acompañan tu Palabra en este escenario?',
      '¿Cómo es la escucha o el diálogo con los demás?',
      '¿Se percibe un Límite claro o un Vínculo de cuidado?'
    ],
    evaluationCriteria: [
      'Identifica voces y personajes en su narrativa.',
      'Analiza dinámicas de relación desde la ética del cuidado.',
      'Reconoce la importancia del otro en la construcción del Ser.'
    ]
  });

  return grids;
}

/**
 * Genera una rejilla única (por defecto la emocional) para compatibilidad.
 */
export function generatePedagogicalGrid(reading: DreamReadingLayer): PedagogicalGrid {
  return generateAllPedagogicalGrids(reading)[0];
}

/**
 * Función exportada para generar el conjunto de rejillas de observación.
 */
export function generatePedagogicalGrids(reading: DreamReadingLayer): PedagogicalGrid[] {
  return generateAllPedagogicalGrids(reading);
}