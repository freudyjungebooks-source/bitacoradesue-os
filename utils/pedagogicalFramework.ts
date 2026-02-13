import { AgeGroup, SymbolicCategory } from '../types';

export interface CurriculumStep {
  gradeRange: string;
  ageRangeLabel: string;
  emotionalCapacities: string;
  humanObjective: string;
  linguisticObjective: string;
  symbolicObjective: string;
  writingActivities: string[];
  corporalActivities: string[];
  dbaReference: string[];
  standardsReference: string[];
  citizenCompetencies: string[];
  ethicalLimits: string;
  symbolicFocus: SymbolicCategory[];
  planetLink: string;
  activityExample: string;
  learningOutcomes: string[];
  skills: {
    lectura: string;
    escritura: string;
    oralidad: string;
    escucha: string;
    simbolismo: string;
    corporalidad: string;
  };
}

export const PEDAGOGICAL_FRAMEWORK: Record<string, CurriculumStep> = {
  "1": {
    gradeRange: "grado 1°",
    ageRangeLabel: "6-7 años",
    emotionalCapacities: "asombro y seguridad básica.",
    humanObjective: "reconocer la protección y el cuidado como base del Ser.",
    linguisticObjective: "explorar la sonoridad de la Palabra y la grafía inicial desde el afecto.",
    symbolicObjective: "animal protector: la imagen del guardián onírico.",
    writingActivities: ["el nombre de mi guardián", "colores de mi nido"],
    corporalActivities: ["movimiento animal suave", "gesto de cobijo"],
    dbaReference: ["dba 1: reconoce que los textos comunican ideas."],
    standardsReference: ["comprendo textos literarios para propiciar mi creatividad."],
    citizenCompetencies: ["reconocimiento de emociones básicas."],
    ethicalLimits: "validar el dibujo como escritura legítima.",
    symbolicFocus: ['Protección', 'Naturaleza'],
    planetLink: "cuidado de los seres pequeños del jardín escolar.",
    activityExample: "danza del nido: crear un círculo corporal que protege un tesoro simbólico.",
    learningOutcomes: ["identifica su animal protector.", "produce trazos con intención comunicativa."],
    skills: {
      lectura: "lectura de imágenes.", escritura: "grafía afectiva.", oralidad: "narración de imágenes.", escucha: "respeto al turno.", simbolismo: "identificación de protectores.", corporalidad: "ritmo animal."
    }
  },
  "3": {
    gradeRange: "grado 3°",
    ageRangeLabel: "8-9 años",
    emotionalCapacities: "curiosidad expansiva y autonomía incipiente.",
    humanObjective: "fomentar la iniciativa y la resolución de misterios interiores.",
    linguisticObjective: "uso de verbos de acción y estructuras narrativas secuenciales.",
    symbolicObjective: "la llave: el poder de abrir nuevos mundos de conocimiento.",
    writingActivities: ["¿qué abre esta llave hoy?", "el misterio de la puerta cerrada"],
    corporalActivities: ["gesto de giro y apertura", "búsqueda del tesoro simbólico"],
    dbaReference: ["dba 4: escribe textos narrativos imaginarios."],
    standardsReference: ["identifico la silueta textual de los cuentos y leyendas."],
    citizenCompetencies: ["identificación de fortalezas personales."],
    ethicalLimits: "no forzar la revelación de secretos personales.",
    symbolicFocus: ['Emergente', 'Lenguaje'],
    planetLink: "las llaves de la naturaleza: semillas y ciclos estacionales.",
    activityExample: "imaginación activa: gestos para abrir puertas invisibles en el aula.",
    learningOutcomes: ["resuelve nudos narrativos con creatividad.", "produce textos con estructura clara."],
    skills: {
      lectura: "lectura de misterios.", escritura: "narrativa secuencial.", oralidad: "exposición de hallazgos.", escucha: "curiosidad respetuosa.", simbolismo: "resolución de conflictos.", corporalidad: "movimiento de precisión."
    }
  },
  "4": {
    gradeRange: "grado 4°",
    ageRangeLabel: "9-10 años",
    emotionalCapacities: "conciencia histórica e interés por el origen.",
    humanObjective: "honrar la Memoria de los Ancestros y el potencial propio.",
    linguisticObjective: "redacción de relatos biográficos y mitos personales de origen.",
    symbolicObjective: "la semilla: el origen y el potencial del linaje.",
    writingActivities: ["la historia de mi abuelo/a soñado", "mi propia semilla de luz"],
    corporalActivities: ["postura del brote", "movimiento de raíces"],
    dbaReference: ["dba 3: organiza ideas en párrafos coherentes."],
    standardsReference: ["utilizo el lenguaje para reconstruir mi historia personal."],
    citizenCompetencies: ["valoración de la herencia cultural."],
    ethicalLimits: "enfoque en la fortaleza heredada, no en el trauma familiar.",
    symbolicFocus: ['Ancestros', 'Memoria'],
    planetLink: "estudio de la genealogía vegetal y siembra de semillas.",
    activityExample: "el árbol del linaje: movimiento enraizado que crece hacia la luz.",
    learningOutcomes: ["relaciona su identidad con sus ancestros.", "produce párrafos temáticos coherentes."],
    skills: {
      lectura: "interpretación de mitos.", escritura: "biografía simbólica.", oralidad: "relato de memorias.", escucha: "escucha generacional.", simbolismo: "ancestralidad.", corporalidad: "enraizamiento."
    }
  },
  "5": {
    gradeRange: "grado 5°",
    ageRangeLabel: "10-11 años",
    emotionalCapacities: "sentido de justicia y conexión con la alteridad.",
    humanObjective: "construir puentes de diálogo y respeto por la diferencia.",
    linguisticObjective: "uso de conectores de transición y argumentos simples.",
    symbolicObjective: "el puente: el tránsito hacia el otro y el respeto.",
    writingActivities: ["crónica de un encuentro", "un puente entre dos orillas"],
    corporalActivities: ["equilibrio colectivo", "construcción de puentes humanos"],
    dbaReference: ["dba 1: produce textos argumentativos sencillos."],
    standardsReference: ["comprendo la importancia de la escucha activa en la comunicación."],
    citizenCompetencies: ["mediación constructiva de conflictos."],
    ethicalLimits: "asegurar que el puente simbólico sea un espacio seguro.",
    symbolicFocus: ['Camino', 'Vínculo'],
    planetLink: "corredores biológicos y la interconectividad de la Vida.",
    activityExample: "el paso del puente: cruce de miradas y gestos de reconocimiento.",
    learningOutcomes: ["utiliza conectores para dar fluidez al texto.", "expresa respeto por la opinión ajena."],
    skills: {
      lectura: "comprensión de nexos.", escritura: "argumentación inicial.", oralidad: "debate respetuoso.", escucha: "validación del otro.", simbolismo: "mediación.", corporalidad: "equilibrio compartido."
    }
  },
  "6": {
    gradeRange: "grado 6°",
    ageRangeLabel: "11-12 años",
    emotionalCapacities: "incertidumbre ante el cambio corporal.",
    humanObjective: "aceptar el cambio y la transformación con ligereza.",
    linguisticObjective: "uso de figuras literarias: la metáfora y el símil en el Sueño.",
    symbolicObjective: "el viento: el aliento de la transformación constante.",
    writingActivities: ["poema a lo invisible", "bitácora de una ráfaga"],
    corporalActivities: ["movimiento fluido de aire", "danza con telas ligeras"],
    dbaReference: ["dba 4: caracteriza elementos de la lírica."],
    standardsReference: ["reconozco la función estética y simbólica del lenguaje."],
    citizenCompetencies: ["respeto por la diversidad de desarrollo físico."],
    ethicalLimits: "validar la extrañeza del cambio como proceso natural.",
    symbolicFocus: ['Transformación', 'Límite'],
    planetLink: "las corrientes de aire y el clima como sistema de cambio.",
    activityExample: "cuerpos al viento: exploración de trayectorias espaciales fluidas.",
    learningOutcomes: ["identifica metáforas en su propia producción.", "expresa sentimientos de cambio."],
    skills: {
      lectura: "análisis poético.", escritura: "escritura figurada.", oralidad: "expresión de vulnerabilidad.", escucha: "resonancia estética.", simbolismo: "metamorfosis.", corporalidad: "fluidez."
    }
  },
  "8": {
    gradeRange: "grado 8°",
    ageRangeLabel: "13-14 años",
    emotionalCapacities: "necesidad de solidez y superación de desafíos.",
    humanObjective: "reconocer el esfuerzo y la resiliencia como bases del carácter.",
    linguisticObjective: "escritura de ensayos breves y crónicas de superación personal.",
    symbolicObjective: "la montaña: la solidez ante la tormenta y el esfuerzo.",
    writingActivities: ["mi montaña interna", "el consejo de la cima"],
    corporalActivities: ["postura de la montaña (tadasana)", "escalada simbólica"],
    dbaReference: ["dba 1: produce textos con postura crítica."],
    standardsReference: ["comprendo factores culturales y sociales en el lenguaje."],
    citizenCompetencies: ["responsabilidad ante las consecuencias de los actos."],
    ethicalLimits: "evitar la autoayuda superficial; enfoque en la solidez del Ser.",
    symbolicFocus: ['Tiempo', 'Orden'],
    planetLink: "geología, estabilidad de la Tierra y respeto por las cumbres.",
    activityExample: "cima del silencio: meditación en movimiento sobre la fortaleza propia.",
    learningOutcomes: ["argumenta su postura sobre desafíos.", "escribe crónicas descriptivas."],
    skills: {
      lectura: "pensamiento crítico.", escritura: "ensayo personal.", oralidad: "oratoria consciente.", escucha: "escucha de la fuerza.", simbolismo: "resiliencia.", corporalidad: "estabilidad."
    }
  },
  "9": {
    gradeRange: "grado 9°",
    ageRangeLabel: "14-15 años",
    emotionalCapacities: "integración de identidad compleja y encuentro con la sombra.",
    humanObjective: "integrar aspectos negados o temidos de la propia personalidad.",
    linguisticObjective: "uso del autorretrato narrativo y la paradoja simbólica.",
    symbolicObjective: "el espejo: el encuentro con la sombra y la Verdad.",
    writingActivities: ["carta a mi sombra", "el otro lado del espejo del Sueño"],
    corporalActivities: ["danza del espejo", "imitación gestual de la sombra"],
    dbaReference: ["dba 5: infiere significados en textos complejos."],
    standardsReference: ["produzco textos con valor estético y ético."],
    citizenCompetencies: ["cuidado de la salud emocional propia y ajena."],
    ethicalLimits: "acompañar sin patologizar lo que surge del inconsciente.",
    symbolicFocus: ['Equilibrio', 'Cuerpo'],
    planetLink: "reflejos en el agua y simetría en la naturaleza viva.",
    activityExample: "el espejo oscuro: integrar gestos no habituales en la danza personal.",
    learningOutcomes: ["analiza la ambigüedad narrativa.", "produce autorretratos profundos."],
    skills: {
      lectura: "lectura profunda.", escritura: "autorretrato crítico.", oralidad: "coherencia ética.", escucha: "escucha de lo oculto.", simbolismo: "individuación.", corporalidad: "integración gestual."
    }
  },
  "11": {
    gradeRange: "grado 11°",
    ageRangeLabel: "16-17 años",
    emotionalCapacities: "trascendencia y compromiso con el legado.",
    humanObjective: "asumir la Palabra como un hilo que teje el futuro compartido.",
    linguisticObjective: "tesis existencial y proyecto de Vida narrado con maestría.",
    symbolicObjective: "el hilo: el tejido del legado y la responsabilidad.",
    writingActivities: ["mi Palabra para el mundo", "tejiendo mi destino ético"],
    corporalActivities: ["tejido colectivo de hilos", "danza del compromiso vital"],
    dbaReference: ["dba 1: expresa postura crítica fundamentada."],
    standardsReference: ["soy un ciudadano que aporta a la paz desde su lenguaje."],
    citizenCompetencies: ["acción para la reparación simbólica."],
    ethicalLimits: "respetar la soberanía absoluta del destino que el estudiante elija.",
    symbolicFocus: ['Legado', 'Ancestros', 'Tierra'],
    planetLink: "justicia climática y legado generacional.",
    activityExample: "la red de hilos: ceremonia de tejido grupal donde cada hilo es un compromiso.",
    learningOutcomes: ["proyecta su Vida con responsabilidad ética.", "produce textos de profundidad retórica."],
    skills: {
      lectura: "lectura de Vida.", escritura: "proyecto de Vida.", oralidad: "liderazgo inspirador.", escucha: "escucha planetaria.", simbolismo: "trascendencia.", corporalidad: "conexión universal."
    }
  }
};
