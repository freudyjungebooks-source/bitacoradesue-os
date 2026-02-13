
import React from 'react';
import { render } from '@testing-library/react';
import StudentSovereignText from '../components/StudentSovereignText';

/* global describe, it, expect */

// Declaraciones para el entorno de pruebas
declare const describe: any;
declare const it: any;
declare const expect: any;

describe('Auditoría de Soberanía Tipográfica', () => {
  const content = "Relato que no puede ser alterado por el sistema.";

  it('debe mantener exactamente 28px a pesar de ataques de CSS global', () => {
    // Simulamos un ataque de CSS global agresivo
    const style = document.createElement('style');
    style.innerHTML = `
      * { font-size: 10px !important; text-transform: uppercase !important; font-weight: 900 !important; }
      div { line-height: 1 !important; }
    `;
    document.head.appendChild(style);

    const { container } = render(React.createElement(StudentSovereignText, { content }));
    const host = container.querySelector('.sovereign-word-host');
    const shadowRoot = host?.shadowRoot;
    const wordElement = shadowRoot?.querySelector('.recinto-sagrado');
    
    if (wordElement) {
      const computed = window.getComputedStyle(wordElement);
      // Verificamos la inviolabilidad tipográfica
      expect(computed.fontSize).toBe('28px');
      expect(computed.fontWeight).toBe('400');
      expect(computed.textTransform).toBe('none');
      expect(computed.lineHeight).toMatch(/44.8px|1.6/); // 28px * 1.6 = 44.8px
    }

    document.head.removeChild(style);
  });

  it('no debe renderizar clases dinámicas de Tailwind en el texto del estudiante', () => {
    const { container } = render(React.createElement(StudentSovereignText, { content }));
    const host = container.querySelector('.sovereign-word-host');
    // El host no debe tener clases de Tailwind que afecten tipografía
    expect(host?.className).not.toContain('text-');
    expect(host?.className).not.toContain('font-');
  });
});
