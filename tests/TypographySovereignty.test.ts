
import React from 'react';
import { render } from '@testing-library/react';
import StudentSovereignText from '../components/StudentSovereignText';

/* global describe, it, expect */
declare const describe: any;
declare const it: any;
declare const expect: any;

describe('Auditoría Técnica de Soberanía: StudentSovereignText', () => {
  const content = "Mi palabra no cambia de tamaño.";

  it('debe mantener 28px exactos ignorando estilos globales agresivos', () => {
    // Simulamos un ataque de CSS global masivo
    const style = document.createElement('style');
    style.innerHTML = `
      * { font-size: 5px !important; text-transform: uppercase !important; font-weight: 900 !important; }
      div { line-height: 1 !important; }
      .sovereign-word-host { font-size: 2px !important; }
    `;
    document.head.appendChild(style);

    const { container } = render(React.createElement(StudentSovereignText, { content }));
    const host = container.querySelector('.sovereign-word-host');
    const shadowRoot = host?.shadowRoot;
    const innerTextElement = shadowRoot?.querySelector('.recinto-sagrado');
    
    if (innerTextElement) {
      const computed = window.getComputedStyle(innerTextElement);
      
      // Verificación de los pilares de la Capa 1 (El Ser)
      expect(computed.fontSize).toBe('28px');
      expect(computed.fontWeight).toBe('400');
      expect(computed.textTransform).toBe('none');
      expect(computed.lineHeight).toMatch(/44.8px|1.6/);
    }

    document.head.removeChild(style);
  });

  it('debe residir dentro de un Shadow DOM para aislamiento absoluto', () => {
    const { container } = render(React.createElement(StudentSovereignText, { content }));
    const host = container.querySelector('.sovereign-word-host');
    expect(host?.shadowRoot).not.toBeNull();
  });
});
