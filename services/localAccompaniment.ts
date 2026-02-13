import { AcompanamientoResponse, AgeGroup, WritingType } from '../types';
import { detectEmotionalClimate, getEmotionalFaro } from '../utils/emotionalLogic';
import { normalizeSpanishText } from '../utils/linguisticNormalizer';

/**
 * FORTALEZA LOCAL - EL CORAZÓN DE LA COMUNIDAD
 * Garantiza acompañamiento ético y trazabilidad académica sin dependencia de red.
 * Actúa como el DEFAULT_ACCOMPANIMENT cuando la IA está en pausa o modo local.
 */
export const getLocalAccompaniment = (params: { 
  title: string, 
  content: string, 
  writingType: WritingType,
  ageGroup: AgeGroup 
}): AcompanamientoResponse => {
  const climate = detectEmotionalClimate(params.content);
  const resonanceMessage = getEmotionalFaro(climate);

  // Mapeo determinista de estándares MEN (Soberanía Educativa)
  const curricularIntegration = {
    infancia: {
      estandares: ["Producción de textos orales y escritos que responden a diversos propósitos comunicativos."],
      dba: ["Expresa sus ideas, sentimientos y fantasías mediante diferentes formas de lenguaje."],
      competencias: ["Competencia comunicativa inicial."]
    },
    adolescencia: {
      estandares: ["Produzco textos escritos que evidencian procedimientos sistemáticos de ajuste."],
      dba: ["Escribe textos narrativos sobre situaciones imaginarias."],
      competencias: ["Competencia semántica y ética."]
    },
    jóvenes: {
      estandares: ["Produzco textos que evidencian el conocimiento del funcionamiento de la lengua."],
      dba: ["Expresa una postura reflexiva frente a los textos que escribe."],
      competencias: ["Pensamiento crítico y soberanía."]
    },
    adultos: {
      estandares: ["Producción de textos complejos con intención reflexiva."],
      dba: ["Construye sentidos profundos a partir de la relación con el entorno."],
      competencias: ["Liderazgo ético."]
    }
  }[params.ageGroup];

  return {
    acogidaHumana: normalizeSpanishText("El sistema está en modo local. Tu texto ha sido recibido con profundo respeto en este recinto sagrado."),
    escuchaRespetuosa: normalizeSpanishText("Tu palabra ha sido guardada en la memoria de este portal. Se escucha el eco de tu relato en el silencio de la bitácora."),
    lecturaSimbolica: { 
      tonoEmocional: climate.charAt(0).toUpperCase() + climate.slice(1), 
      resonancia: normalizeSpanishText(resonanceMessage),
      símbolosDetectados: []
    },
    acompanamientoLinguistico: { 
      observation: normalizeSpanishText("Tu escritura fluye con un ritmo natural y honesto."), 
      sugerenciaOpcional: normalizeSpanishText("Habita tu propia voz; tu expresión es digna tal como nace de tu ser."), 
      versionRefinada: "" 
    },
    integracionCurricular: curricularIntegration,
    tecnica: {
      idProcesamiento: "local-core-v12",
      modeloVersion: "soberanía-comunitaria",
      timestamp: Date.now(),
      emotionalDensity: "media"
    },
    keywords: ["Memoria", "Ser", "Soberanía"],
    anchors: ["Identidad"]
  };
};