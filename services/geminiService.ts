import { AcompanamientoResponse, AgeGroup, WritingType, ClassicalSymbolMeaning, Workshop } from "../types";
import { getLocalAccompaniment } from "./localAccompaniment";

/**
 * PORTAL DE ACOMPAÑAMIENTO SOBERANO
 * Orquestador que garantiza respuesta ética mediante fallback local inmediato.
 */

const API_KEY = import.meta.env.VITE_API_KEY;

export const accompanyDream = async (params: { 
  title: string, 
  content: string, 
  writingType: WritingType,
  ageGroup: AgeGroup 
}): Promise<AcompanamientoResponse> => {

  // 1. Intento de acompañamiento remoto (IA)
  if (navigator.onLine && API_KEY) {
    try {
      const { remoteAccompany } = await import("./remoteAccompaniment");
      const remoteResult = await remoteAccompany(params);
      if (remoteResult) return remoteResult;
    } catch (error) {
      console.warn("IA externa en pausa. Activando Fortaleza Local.");
    }
  }

  // 2. Fortaleza Local (Core Comunitario)
  return getLocalAccompaniment(params);
};

export const accompanyDreamSeguro = async (params: { 
  title: string, 
  content: string, 
  writingType: WritingType,
  ageGroup: AgeGroup 
}): Promise<AcompanamientoResponse> => {
  return accompanyDream(params);
};

export const searchSymbolMeaning = async (symbol: string): Promise<ClassicalSymbolMeaning> => {

  if (navigator.onLine && API_KEY) {
    try {
      const { remoteSearchSymbol } = await import("./remoteAccompaniment");
      return await remoteSearchSymbol(symbol);
    } catch (e) {
      console.warn("Búsqueda remota no disponible.");
    }
  }

  throw new Error("Consulta externa no disponible. Verifica la API o conexión.");
};

export const generateWorkshop = async (content: string): Promise<Workshop> => {

  if (navigator.onLine && API_KEY) {
    try {
      const { remoteGenerateWorkshop } = await import("./remoteAccompaniment");
      return await remoteGenerateWorkshop(content);
    } catch (e) {
      console.warn("Generación remota no disponible.");
    }
  }

  throw new Error("Generación remota no disponible.");
};
