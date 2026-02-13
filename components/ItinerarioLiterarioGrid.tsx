
import React from 'react';

interface ItinerarioStep {
  label: string;
  title: string;
  description: string;
  resonance: string;
}

interface ItinerarioLiterarioGridProps {
  steps: ItinerarioStep[];
}

const ItinerarioLiterarioGrid: React.FC<ItinerarioLiterarioGridProps> = ({ steps }) => {
  return (
    <div className="itinerario-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <style>{`
        .itinerario-card {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(30, 42, 58, 0.08);
          border-radius: 2.5rem;
          padding: 2rem;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .itinerario-card:hover {
          border-color: #D8C27A;
          background: white;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -20px rgba(30, 42, 58, 0.1);
        }
        .itinerario-label {
          font-size: 11px;
          font-weight: 700;
          color: #8FAE9E;
          margin-bottom: 0.5rem;
          display: block;
        }
        .itinerario-title {
          font-family: 'Lora', serif;
          font-size: 20px; /* Tamaño educativo estabilizado */
          font-weight: 600;
          color: #1E2A3A;
          line-height: 1.3;
          margin-bottom: 1rem;
          font-style: italic;
        }
        .itinerario-desc {
          font-size: 14px;
          color: #1E2A3A;
          opacity: 0.6;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .itinerario-resonance {
          font-size: 11px;
          font-weight: 600;
          color: #D8C27A;
          border-top: 1px solid rgba(30, 42, 58, 0.05);
          padding-top: 1rem;
          font-style: italic;
        }
      `}</style>
      {steps.map((step, idx) => (
        <div key={idx} className="itinerario-card">
          <div>
            <span className="itinerario-label">{step.label}</span>
            <h4 className="itinerario-title">{step.title}</h4>
            <p className="itinerario-desc">{step.description}</p>
          </div>
          <div className="itinerario-resonance">Resonancia: {step.resonance}</div>
        </div>
      ))}
    </div>
  );
};

export default ItinerarioLiterarioGrid;
