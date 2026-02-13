
/**
 * Guardián del Silencio Pedagógico
 * Auditoría de integridad de la soberanía del autor.
 */

import fs from 'fs';
import path from 'path';

const FORBIDDEN_PATTERNS = [
  { regex: /content\.length/, msg: "Prohibido: Lógica visual dependiente de la longitud del texto." },
  { regex: /text\.length/, msg: "Prohibido: Feedback basado en cantidad de caracteres." },
  { regex: /toUpperCase\(\)/, msg: "Prohibido: Normalización forzada de mayúsculas." },
  { regex: /toLowerCase\(\)/, msg: "Prohibido: Normalización forzada de minúsculas." },
  { regex: /className=\{.*content.*\?/, msg: "Prohibido: Clases dinámicas basadas en contenido del usuario." }
];

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  const lines = content.split('\n');

  FORBIDDEN_PATTERNS.forEach(pattern => {
    lines.forEach((line, index) => {
      if (pattern.regex.test(line)) {
        issues.push({
          line: index + 1,
          text: pattern.msg,
          source: line.trim()
        });
      }
    });
  });

  return issues;
}

const files = [
  'App.tsx',
  'components/DreamEntryCard.tsx',
  'components/DreamForm.tsx',
  'components/LinguisticGuardian.tsx',
  'components/PedagogicalReflector.tsx'
];

console.log("\n🌿 [AUDITORÍA DE SILENCIO PEDAGÓGICO]");
let totalIssues = 0;

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    const issues = auditFile(filePath);
    if (issues.length > 0) {
      console.log(`\n⚠️  ${file}:`);
      issues.forEach(issue => {
        console.log(`   L${issue.line}: ${issue.text} -> "${issue.source}"`);
        totalIssues++;
      });
    }
  }
});

if (totalIssues > 0) {
  console.log(`\n❌ Se encontraron ${totalIssues} violaciones a la soberanía del autor.\n`);
  process.exit(1);
} else {
  console.log("\n✅ El suelo es fértil. El sistema guarda silencio ante la escritura.\n");
  process.exit(0);
}
