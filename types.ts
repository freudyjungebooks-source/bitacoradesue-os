
export type SystemMode = 'estudiante' | 'profesor' | 'produccion' | 'adulto';
export type UserRole = 'estudiante' | 'adulto';
export type AgeGroup = 'infancia' | 'adolescencia' | 'jóvenes' | 'adultos';

export type EmotionalTone = string;
export type PedagogyState = 'silent' | 'active';
export type PedagogicalLevel = 'inicial' | 'intermedio' | 'profundo';
export type FocusType = 'emocional' | 'simbólico' | 'relacional';

export type SymbolicCategory = 
  | 'Naturaleza' | 'Arquetipo' | 'Emoción' | 'Tránsito' | 'Vínculo' 
  | 'Elemento' | 'Memoria' | 'Transformación' | 'Objeto' | 'Protección' 
  | 'Lenguaje' | 'Ancestros' | 'Camino' | 'Límite' | 'Tiempo' 
  | 'Orden' | 'Equilibrio' | 'Cuerpo' | 'Legado' | 'Tierra' | 'Emergente';

export type GradeLevel = 
  | 'Preescolar' 
  | 'Primero – Segundo' 
  | 'Tercero – Cuarto' 
  | 'Quinto' 
  | 'Sexto – Séptimo' 
  | 'Octavo – Noveno' 
  | 'Décimo – Undécimo' 
  | 'Adultos';

export type WritingType = 
  | 'sueño' 
  | 'diario' 
  | 'emoción' 
  | 'recuerdo' 
  | 'diario reflexivo' 
  | 'escritura emocional' 
  | 'observación pedagógica';

export type AppView = 'bitacora' | 'talleres' | 'diccionario' | 'memoria' | 'integracion' | 'soporte' | 'purpose' | 'institucional' | 'circulos';

export interface UserProfile {
  role: UserRole;
  grade: GradeLevel;
  ageGroup: AgeGroup;
  studentCode: string;
}

export interface DreamReadingLayer {
  acogidaHumana?: string;
  escuchaRespetuosa?: string;
  lecturaSimbolica?: {
    tonoEmocional: string;
    resonancia: string;
    símbolosDetectados: string[];
  };
  protocoloEscuchaAtenta?: {
    nivel: "Preventivo" | "Orientativo" | "Derivación Responsable";
    justificacionPedagogica: string;
    accionSugerida?: string;
  };
  acompanamientoLinguistico?: {
    observation: string;
    sugerenciaOpcional: string;
    versionRefinada: string;
  };
  integracionCurricular?: {
    estandares: string[];
    dba: string[];
    competencias: string[];
  };
  tecnica?: {
    idProcesamiento: string;
    modeloVersion: string;
    timestamp: number;
    emotionalDensity: 'baja' | 'media' | 'profunda';
  };
  keywords?: string[];
  anchors?: string[];
}

export interface PedagogicalGrid {
  ageGroup: AgeGroup;
  focus: FocusType;
  level: PedagogicalLevel;
  anchorsUsed: string[];
  guidingQuestions: string[];
  evaluationCriteria: string[];
}

export interface DreamEntryMetadata {
  studentCode: string;
  userRole: UserRole;
  gradeLevel: GradeLevel;
  ageGroup: AgeGroup;
  writingType: WritingType;
  academicArea?: string;
  location?: string;
}

export interface DreamEntry {
  id: string;
  date: string;
  timestamp: number;
  title: string;
  content: string; // VOZ SOBERANA
  metadata: DreamEntryMetadata;
  readingLayer?: DreamReadingLayer; // OPCIONAL, SIEMPRE
}

export type AcompanamientoResponse = DreamReadingLayer;

export interface Workshop {
  id: string;
  workshopTitle: string;
  grade: string;
  ageRange: string;
  duration: string;
  centralSymbol: string;
  humanObjectives: string;
  linguisticObjectives: string;
  activities: { step: string; description: string; }[];
  date: string;
  academicIntegration: {
    languageStandards: string[];
    dba: string[];
    citizenshipCompetencies: string[];
    learningOutcomes: string[];
    curriculumGuidelines?: string[];
  };
  originalContent?: string;
  selfEvaluation?: {
    total: number;
    criteria: any;
  };
}

export interface PersonalWord {
  id: string;
  word: string;
  category: SymbolicCategory | string;
  origin: string;
  createdAt: string;
  definicionPersonal: string;
  meaning?: string;
  classicalData?: ClassicalSymbolMeaning;
  definicionAcademica?: string;
  resonanciaEmocional?: string;
  valorSimbolico?: string;
  usoPedagogico?: string;
  pedagogicalUse?: string;
  languageCompetencies?: string;
  reflexiveClosure?: string;
  pedagogicalCycles?: {
    preescolar: string;
    primaria: string;
    secundaria: string;
    media: string;
    adultos: string;
  };
  ejemploFrase?: string;
  isPrivate?: boolean;
}

export interface ClassicalSymbolMeaning {
  symbol: string;
  category: SymbolicCategory;
  mainDefinition: string;
  emotionalResonance: string;
  pedagogicalCycles: {
    preescolar: string;
    primaria: string;
    secundaria: string;
    media: string;
    adultos: string;
  };
  languageCompetencies: string;
  reflexiveClosure: string;
  guidingQuestions: string[];
  isEmergent: boolean;
  territorialLink?: string;
}
