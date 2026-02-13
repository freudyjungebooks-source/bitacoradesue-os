
import React from 'react';
import { render } from '@testing-library/react';
import StudentSovereignText from '../components/StudentSovereignText';

/* global describe, it, expect */
declare const describe: any;
declare const it: any;
declare const expect: any;

describe('Auditoría de Inviolabilidad: StudentSovereignText', () => {
  const text = "Este es mi relato. Tiene ERRORES y MAYÚSCULAS.";

  it('debe mantener exactamente 28px a pesar de estilos globales agresivos con !important', () => {
    // Simulamos un ataque de CSS global con !important para intentar romper la soberanía
    const attack = document.createElement('style');
    attack.innerHTML = `
      * { font-size: 10px !important; text-transform: uppercase !important; font-weight: 900 !important; }
      #sovereign-word-vault { display: none !important; }
      .recinto-sagrado { font-size: 5px !important; }
    `;
    document.head.appendChild(attack);

    const { container } = render(React.createElement(StudentSovereignText, { content: text }));
    const host = container.querySelector('#sovereign-word-vault');
    const shadow = host?.shadowRoot;
    const element = shadow?.querySelector('.recinto-sagrado');
    
    if (element) {
      const style = window.getComputedStyle(element);
      
      // Verificación de los Pilares de la Soberanía
      expect(style.fontSize).toBe('28px');
      expect(style.fontWeight).toBe('400');
      expect(style.textTransform).toBe('none');
      expect(style.lineHeight).toMatch(/44.8px|1.6/); // 28 * 1.6
    }

    document.head.removeChild(attack);
  });

  it('debe residir dentro de un Shadow DOM para aislamiento total', () => {
    const { container } = render(React.createElement(StudentSovereignText, { content: text }));
    const host = container.querySelector('#sovereign-word-vault');
    expect(host?.shadowRoot).not.toBeNull();
  });
});
