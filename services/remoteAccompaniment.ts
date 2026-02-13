import { GoogleGenAI, Type } from "@google/genai";
import { AcompanamientoResponse, AgeGroup, WritingType, ClassicalSymbolMeaning, Workshop } from "../types";

/**
 * ADAPTADOR DE ACOMPAÑAMIENTO REMOTO (IA) - VERSIÓN SISTEMA RECTOR 3.6
 * Articula psicología profunda, sistémica, Piaget y Eco.
 */
export const remoteAccompany = async (params: { 
  title: string, 
  content: string, 
  writingType: WritingType,
  ageGroup: AgeGroup 
}): Promise<AcompanamientoResponse | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      Actúa como el "Sistema Rector de Lenguaje y Cuidado Ético".
      Tu función es acompañar la experiencia de escritura, ordenar el lenguaje y cuidar el tránsito emocional del autor.
      RAE: Mayúsculas iniciales estrictas. Prohibido mayúsculas sostenidas en párrafos.
      MARCOS DE COMPRENSIÓN:
      - PSICOLOGÍA: Freud, Jung, enfermedad como símbolo, Joan Garriga (orden del amor).
      - PEDAGOGÍA: Piaget (construcción activa), Umberto Eco (lector activo, máquina perezosa). El texto del sueño es una estructura abierta.
      - SABIDURÍA: Popol Vuh, Kábala, chamanismo, sabiduría asiática.
      PROCESO: No interpretes de forma cerrada. Formula preguntas que fortalezcan el ser. Trata el sueño como un texto vivo que requiere la cooperación del estudiante para generar sentido.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Título: ${params.title}\nContenido: ${params.content}\nTipo de escritura: ${params.writingType}\nEtapa vital: ${params.ageGroup}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            acogidaHumana: { type: Type.STRING },
            escuchaRespetuosa: { type: Type.STRING },
            lecturaSimbolica: {
              type: Type.OBJECT,
              properties: {
                tonoEmocional: { type: Type.STRING },
                resonancia: { type: Type.STRING, description: "Eco sistémico o simbólico del relato." },
                símbolosDetectados: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["tonoEmocional", "resonancia"]
            },
            protocoloEscuchaAtenta: {
              type: Type.OBJECT,
              properties: {
                nivel: { type: Type.STRING, enum: ["Preventivo", "Orientativo", "Derivación Responsable"] },
                justificacionPedagogica: { type: Type.STRING },
                accionSugerida: { type: Type.STRING }
              },
              required: ["nivel", "justificacionPedagogica"]
            },
            integracionCurricular: {
              type: Type.OBJECT,
              properties: {
                estandares: { type: Type.ARRAY, items: { type: Type.STRING } },
                dba: { type: Type.ARRAY, items: { type: Type.STRING } },
                competencias: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            tecnica: {
              type: Type.OBJECT,
              properties: {
                emotionalDensity: { type: Type.STRING, enum: ["baja", "media", "profunda"] }
              }
            }
          },
          required: ["acogidaHumana", "lecturaSimbolica", "protocoloEscuchaAtenta", "tecnica"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    result.tecnica = {
      ...result.tecnica,
      idProcesamiento: `BDS-Soberano-Rector-${Date.now()}`,
      modeloVersion: "Gemini-3-Flash-Sist-Rector-V3.6",
      timestamp: Date.now()
    };
    
    return result as AcompanamientoResponse;
  } catch (error) {
    console.error("Interrupción en la bóveda de acompañamiento remoto:", error);
    return null;
  }
};

export const remoteSearchSymbol = async (symbol: string): Promise<ClassicalSymbolMeaning> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explora el símbolo: "${symbol}".
               PERSPECTIVAS: Piaget (acción), Eco (espacios de sentido), Freud/Jung (psique), Garriga (sistema).
               RAE: Solo mayúscula inicial. No gritar visualmente.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          symbol: { type: Type.STRING },
          category: { type: Type.STRING },
          mainDefinition: { type: Type.STRING, description: "Definición cultural amplia." },
          emotionalResonance: { type: Type.STRING, description: "Eco sistémico o psicológico." },
          pedagogicalCycles: {
            type: Type.OBJECT,
            properties: {
              preescolar: { type: Type.STRING },
              primaria: { type: Type.STRING },
              secundaria: { type: Type.STRING },
              media: { type: Type.STRING },
              adultos: { type: Type.STRING }
            }
          },
          languageCompetencies: { type: Type.STRING },
          reflexiveClosure: { type: Type.STRING, description: "Pregunta final de soberanía." },
          guidingQuestions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["symbol", "mainDefinition", "pedagogicalCycles", "guidingQuestions", "emotionalResonance", "reflexiveClosure"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const remoteGenerateWorkshop = async (content: string): Promise<Workshop> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Diseña un encuentro pedagógico (Taller) basado en: "${content}". 
               ENFOQUE: El ser como eje. Piaget (movimiento) y Eco (interpretación activa).
               RAE: Mayúsculas iniciales estrictas.`,
    config: {
      responseMimeType: "application/json"
    }
  });
  const workshop = JSON.parse(response.text || "{}");
  workshop.id = `WK-Soberania-${Date.now()}`;
  workshop.date = new Date().toLocaleDateString('es-CO');
  return workshop as Workshop;
};