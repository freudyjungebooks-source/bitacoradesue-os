
import React, { useEffect, useRef } from 'react';

interface Props {
  content?: string;
}

/**
 * RECINTO SOBERANO DEL TEXTO
 * Blindaje técnico para la palabra del autor.
 * El Shadow DOM evita que estilos globales interfieran con la estética del relato.
 */
const StudentSovereignText: React.FC<Props> = ({ content }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<ShadowRoot | null>(null);

  const safeContent =
    typeof content === 'string' && content.trim().length > 0
      ? content
      : 'La palabra se guarda en el silencio de la bitácora.';

  useEffect(() => {
    if (!hostRef.current) return;

    if (!shadowRef.current) {
      shadowRef.current = hostRef.current.attachShadow({ mode: 'open' });

      const style = document.createElement('style');
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,400&display=swap');

        :host {
          display: block;
          width: 100%;
        }

        .recinto-sagrado {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 0.75rem;
          padding: 2rem;
          border: 1px solid rgba(216, 194, 122, 0.15);
          
          font-family: 'Lora', serif;
          font-size: 1rem;
          line-height: 1.7;
          color: #1E2A3A;
          font-style: italic;
          
          white-space: pre-wrap;
          word-break: break-word;
          text-align: left;
          position: relative;
          opacity: 0.9;
        }

        .firma-soberana {
            margin-top: 1.5rem;
            display: block;
            font-size: 0.65rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            opacity: 0.2;
            text-align: center;
        }

        @media (max-width: 640px) {
          .recinto-sagrado { padding: 1.5rem; font-size: 0.95rem; }
        }
      `;

      const container = document.createElement('div');
      container.className = 'recinto-sagrado';
      container.id = 'content-vault';

      const footer = document.createElement('span');
      footer.className = 'firma-soberana';
      footer.textContent = 'Palabra Soberana';

      shadowRef.current.appendChild(style);
      shadowRef.current.appendChild(container);
      shadowRef.current.appendChild(footer);
    }

    const container = shadowRef.current.querySelector('#content-vault');
    if (container) {
      container.textContent = safeContent; 
    }
  }, [safeContent]);

  return (
    <div 
      ref={hostRef} 
      className="w-full relative transition-all duration-700" 
      aria-label="Relato del estudiante"
    />
  );
};

export default StudentSovereignText;
