import { 
  AcompanamientoResponse, 
  AgeGroup, 
  WritingType, 
  ClassicalSymbolMeaning, 
  Workshop 
} from "../types";

import { getLocalAccompaniment } from "./localAccompaniment";

/**
 * PORTAL DE ACOMPAÑAMIENTO SOBERANO
 * Orquestador que garantiza respuesta ética mediante fallback local inmediato.
 */

const API_KEY = import.meta.env.VITE_API_KEY;

console.log("=== DEBUG API KEY ===");
console.log("API_KEY:", API_KEY);
console.log("Navigator online:", navigator.onLine);
console.log("====================");


/* ======================================================
   ACOMPAÑAMIENTO DE SUEÑOS
====================================================== */

export const accompanyDream = async (params: { 
  title: string, 
  content: string, 
  writingType: WritingType,
  ageGroup: AgeGroup 
}): Promise<AcompanamientoResponse> => {

  // Intento remoto SOLO si hay API key y conexión
  if (navigator.onLine && API_KEY) {
    try {
      const { remoteAccompany } = await import("./remoteAccompaniment");
      const remoteResult = await remoteAccompany(params);
      if (remoteResult) return remoteResult;
    } catch (error) {
      console.warn("IA externa en pausa. Activando Fortaleza Local.", error);
    }
  }

  // Fortaleza Local (Core Comunitario)
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


/* ======================================================
   BÚSQUEDA DE SÍMBOLOS (AHORA SEGURA VÍA SERVERLESS)
====================================================== */

export const searchSymbolMeaning = async (
  symbol: string
): Promise<ClassicalSymbolMeaning> => {

  console.log("Buscando símbolo:", symbol);

  const response = await fetch("/api/searchSymbol", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ symbol })
  });

  if (!response.ok) {
    throw new Error("Error consultando el servidor.");
  }

  const data = await response.json();

  return data;
};


/* ======================================================
   GENERACIÓN DE TALLERES (DE MOMENTO REMOTO)
====================================================== */

export const generateWorkshop = async (
  content: string
): Promise<Workshop> => {

  if (navigator.onLine && API_KEY) {
    try {
      const { remoteGenerateWorkshop } = await import("./remoteAccompaniment");
      return await remoteGenerateWorkshop(content);
    } catch (e) {
      console.warn("Generación remota no disponible.", e);
    }
  }

  throw new Error("Generación remota no disponible.");
};
