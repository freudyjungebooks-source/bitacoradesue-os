/**
 * MOTOR DE NORMALIZACIÓN LINGÜÍSTICA (RAE)
 * Garantiza que la palabra institucional mantenga su dignidad ortográfica y ritmo.
 * Ajustado bajo criterios de auditoría pedagógica institucional (MEN).
 */
export const safeNormalize = (text: any): string => {
  if (text === null || text === undefined) return '';
  
  let input = String(text).trim();
  if (input.length === 0) return '';

  // 1. Normalización de mayúsculas sostenidas (excepto siglas autorizadas)
  const acronyms = ['MEN', 'DBA', 'RAE', 'IA', 'ONU', 'BDS', 'PII', 'GCP', 'ID'];
  
  // Si es una sola palabra y está en mayúsculas, verificar si es sigla
  if (!input.includes(' ')) {
    if (acronyms.includes(input.toUpperCase())) return input.toUpperCase();
    if (input === input.toUpperCase()) return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  // Si es un texto largo en mayúsculas sostenidas, normalizarlo
  if (input.length > 5 && input === input.toUpperCase()) {
    input = input.toLowerCase();
  }

  // 2. Regla RAE: Mayúscula inicial absoluta del texto
  input = input.charAt(0).toUpperCase() + input.slice(1);

  // 3. Regla RAE: Mayúscula tras signos de puntuación de cierre (. ? !)
  input = input.replace(/([.!?]\s+)([a-zñáéíóúü])/g, (match, separator, letter) => {
    return separator + letter.toUpperCase();
  });
  
  // 4. Gestión de puntos suspensivos que cierran enunciado
  input = input.replace(/(\.\.\.\s+)([a-zñáéíóúü])/g, (match, separator, letter) => {
    return separator + letter.toUpperCase();
  });

  // 5. Limpieza de espacios dobles
  input = input.replace(/\s+/g, ' ');

  return input;
};

export const normalizeSystemText = (text?: any): string => safeNormalize(text);
export const normalizeSpanishText = (text?: any): string => safeNormalize(text);