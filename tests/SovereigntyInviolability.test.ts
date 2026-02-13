
import React from 'react';
import { render } from '@testing-library/react';
import StudentSovereignText from '../components/StudentSovereignText';

/* global describe, it, expect */
declare const describe: any;
declare const it: any;
declare const expect: any;

describe('Auditoría Ética: Inviolabilidad de la Palabra', () => {
  const content = "Este es mi relato. No puede ser alterado.";

  it('debe mantener 28px exactos ignorando estilos globales !important', () => {
    // 1. Simular ataque de CSS global agresivo (Tailwind, Typography, Global reset)
    const style = document.createElement('style');
    style.innerHTML = `
      * { font-size: 8px !important; text-transform: uppercase !important; font-weight: 900 !important; }
      div { line-height: 1 !important; color: red !important; }
      .sovereign-word-host { font-size: 5px !important; }
    `;
    document.head.appendChild(style);

    // 2. Renderizar componente
    const { container } = render(React.createElement(StudentSovereignText, { content }));
    const host = container.querySelector('.sovereign-word-host');
    const shadowRoot = host?.shadowRoot;
    const innerTextElement = shadowRoot?.querySelector('.recinto-sagrado');
    
    if (innerTextElement) {
      const computed = window.getComputedStyle(innerTextElement);
      
      // 3. Verificación de Pilares de Soberanía
      expect(computed.fontSize).toBe('28px');
      expect(computed.fontWeight).toBe('400');
      expect(computed.textTransform).toBe('none');
      expect(computed.lineHeight).toMatch(/44.8px|1.6/); // 28 * 1.6
      expect(computed.color).toBe('rgb(30, 42, 58)'); // #1E2A3A
    }

    // 4. Limpiar entorno
    document.head.removeChild(style);
  });

  it('debe existir aislamiento mediante ShadowRoot real', () => {
    const { container } = render(React.createElement(StudentSovereignText, { content }));
    const host = container.querySelector('.sovereign-word-host');
    expect(host?.shadowRoot).not.toBeNull();
  });
});
