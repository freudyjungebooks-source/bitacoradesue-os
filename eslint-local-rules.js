
module.exports = {
  "no-raw-student-content": {
    meta: {
      type: "problem",
      docs: { description: "Prohíbe renderizar contenido del estudiante fuera del componente soberano." }
    },
    create(context) {
      return {
        JSXExpressionContainer(node) {
          const code = context.getSourceCode().getText(node.expression);
          if (/(entry\.content|content|relato)/.test(code)) {
            let parent = node.parent;
            while (parent && parent.type !== 'JSXOpeningElement') {
              parent = parent.parent;
            }
            if (parent && parent.name.name !== 'StudentSovereignText' && parent.name.name !== 'textarea' && parent.name.name !== 'input') {
              context.report({
                node,
                message: "Uso de contenido crudo detectado. Use <StudentSovereignText /> para garantizar la soberanía tipográfica."
              });
            }
          }
        }
      };
    }
  },
  "no-visual-feedback-from-text": {
    meta: {
      type: "problem",
      docs: { description: "Prohíbe que variables de texto o métodos de capitalización afecten estilos o renderizado condicional." }
    },
    create(context) {
      const forbiddenNames = /content|text|value|input|relato|palabra|toUpperCase|toLowerCase/i;
      return {
        JSXExpressionContainer(node) {
          if (node.expression.type === "ConditionalExpression") {
            const test = node.expression.test;
            const sourceCode = context.getSourceCode().getText(test);
            if (forbiddenNames.test(sourceCode)) {
              context.report({
                node,
                message: "Interferencia Detectada: El contenido o su capitalización no deben dictar cambios visuales (Silencio Pedagógico)."
              });
            }
          }
        },
        TemplateLiteral(node) {
          node.expressions.forEach(expr => {
            const sourceCode = context.getSourceCode().getText(expr);
            if (forbiddenNames.test(sourceCode)) {
              context.report({
                node,
                message: "Ruido Visual: Interpolación de contenido o capitalización detectada en clases."
              });
            }
          });
        }
      };
    }
  },
  "pedagogical-component-guard": {
    meta: { type: "problem" },
    create(context) {
      return {
        JSXOpeningElement(node) {
          const name = node.name.name;
          if (/^(Pedagogical|Linguistic|Reflector|Guardian)/.test(name)) {
            const hasPedagogyProp = node.attributes.some(
              attr => attr.type === "JSXAttribute" && attr.name.name === "pedagogy"
            );
            if (!hasPedagogyProp) {
              context.report({
                node,
                message: `El componente '${name}' debe recibir la prop 'pedagogy' para garantizar el renderizado controlado.`
              });
            }
          }
        }
      };
    }
  }
};
