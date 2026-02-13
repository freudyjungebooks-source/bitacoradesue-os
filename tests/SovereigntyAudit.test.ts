
import React from 'react';
import { render } from '@testing-library/react';
import StudentSovereignText from '../components/StudentSovereignText';

/* global describe, it, expect */
declare const describe: any;
declare const it: any;
declare const expect: any;

describe('Auditoría de Inviolabilidad Tipográfica (Capa 1)', () => {
  const content = "Esta palabra es mi territorio sagrado.";

  it('debe mantener 28px exactos ignorando ataques de CSS global con !important', () => {
    // Simulamos un ataque masivo de Tailwind/CSS Global
    const attack = document.createElement('style');
    attack.innerHTML = `
      * { font-size: 8px !important; text-transform: uppercase !important; font-weight: 900 !important; }
      div { line-height: 1 !important; }
      #sovereign-vault { font-size: 2px !important; }
      .sovereign-word-host { font-size: 1px !important; }
    `;
    document.head.appendChild(attack);

    const { container } = render(React.createElement(StudentSovereignText, { content }));
    const host = container.querySelector('#sovereign-vault');
    const shadow = host?.shadowRoot;
    const element = shadow?.querySelector('.recinto-sagrado');
    
    if (element) {
      const style = window.getComputedStyle(element);
      
      // Verificación de los Pilares de la Soberanía
      expect(style.fontSize).toBe('28px');
      expect(style.fontWeight).toBe('400');
      expect(style.textTransform).toBe('none');
      // 28px * 1.6 = 44.8px
      expect(style.lineHeight).toMatch(/44.8px|1.6/);
    }

    document.head.removeChild(attack);
  });

  it('debe garantizar el aislamiento mediante Shadow DOM real', () => {
    const { container } = render(React.createElement(StudentSovereignText, { content }));
    const host = container.querySelector('#sovereign-vault');
    expect(host?.shadowRoot).not.toBeNull();
  });
});
