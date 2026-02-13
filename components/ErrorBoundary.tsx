import React, { ReactNode, ErrorInfo } from 'react';
import { normalizeSystemText, normalizeSpanishText } from '../utils/linguisticNormalizer';
import { motion } from 'framer-motion';
import { ShieldCheck, Wind, Landmark, Globe } from 'lucide-react';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * GUARDIÁN DE ESTABILIDAD INSTITUCIONAL
 * Dispositivo técnico de resguardo que garantiza la continuidad pedagógica 
 * ante interrupciones del sistema, comunicando estabilidad y custodia funcional.
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Auditoría técnica - Registro de interrupción:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-marfil-cosmico p-8 text-center selection:bg-dorado-suave/30 relative overflow-hidden texture-grain">
          
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-azul-noche rounded-full"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 max-w-xl space-y-10"
          >
            <header className="space-y-6">
              <div className="w-16 h-16 bg-azul-noche text-dorado-suave rounded-full flex items-center justify-center mx-auto shadow-lg border border-dorado-suave/10">
                 <Landmark size={24} strokeWidth={1} />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-azul-noche serif-font italic tracking-tight">
                {normalizeSystemText('Estabilidad en proceso de restauración')}
              </h2>
            </header>

            <div className="bg-white/90 backdrop-blur-md p-10 rounded-[3rem] border border-dorado-suave/10 shadow-sm space-y-6">
              <p className="text-lg text-azul-noche/70 serif-font italic leading-relaxed">
                {normalizeSpanishText('El sistema está recuperando el equilibrio técnico necesario para la labor pedagógica. Su palabra y registros permanecen resguardados en la memoria local, garantizando la seguridad de su proceso.')}
              </p>
              
              <div className="flex justify-center">
                 <div className="flex items-center gap-3 px-5 py-2 bg-marfil-cosmico/50 rounded-full border border-dorado-suave/5">
                    <ShieldCheck size={14} className="text-verde-salvia" />
                    <span className="text-[9px] font-bold text-azul-noche/40 tracking-widest italic">
                      Custodia de datos activa
                    </span>
                 </div>
              </div>
            </div>

            <footer className="space-y-8">
              <button 
                onClick={() => window.location.reload()} 
                className="px-10 py-4 bg-verde-salvia text-white rounded-full font-bold uppercase tracking-widest text-[11px] transition-all duration-500 shadow-md hover:bg-azul-noche hover:text-dorado-suave flex items-center gap-4 mx-auto"
              >
                <Wind size={16} strokeWidth={1.5} />
                <span>Reiniciar portal</span>
              </button>
              
              <div className="flex flex-col items-center gap-3 opacity-30">
                <p className="text-[9px] text-azul-noche serif-font italic leading-relaxed max-w-xs">
                  {normalizeSpanishText('La técnica es un medio para el cuidado educativo. Su relato habita un espacio de respeto institucional.')}
                </p>
                <Globe size={12} strokeWidth={1} />
              </div>
            </footer>
          </motion.div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20">
            <p className="text-[8px] text-azul-noche italic">
              Bitácora de sueños · Marco de referencia MEN Colombia · Versión 1.0
            </p>
          </div>
        </div>
      );
    }

    return children || null;
  }
}

export default ErrorBoundary;