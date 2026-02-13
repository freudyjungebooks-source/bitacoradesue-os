import React, { useState, useEffect, useMemo } from 'react';
import { DreamEntry, Workshop, PersonalWord, SystemMode, AgeGroup, WritingType, UserRole } from './types';
import DreamForm from './components/DreamForm';
import DreamList from './components/DreamList';
import Header from './components/Header';
import Welcome from './components/Welcome';
import SymbolSearch from './components/SymbolSearch';
import PortalMessage from './components/PortalMessage';
import WorkshopForm from './components/WorkshopForm';
import WorkshopList from './components/WorkshopList';
import SymbolicLens from './components/SymbolicLens';
import IntegrationTable from './components/IntegrationTable';
import ResponsibleSupport from './components/ResponsibleSupport';
import WordCircle from './components/WordCircle';
import { normalizeSystemText, normalizeSpanishText } from './utils/linguisticNormalizer';
import { symbolDictionaryService } from './services/symbolDictionaryService';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import IdentificationBar from './components/IdentificationBar';
import Purpose from './components/Purpose';
import DiccionarioSimbolosScreen from './components/DiccionarioSimbolosScreen';
import PedagogicalDocument from './components/PedagogicalDocument';
import ErrorBoundary from './components/ErrorBoundary';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, Plus, Globe } from 'lucide-react';

// Fix: Using a type-casted alias for motion to bypass environment-specific type errors for motion props.
const m = motion as any;

const App: React.FC = () => {
  const STORAGE_KEY = 'bitacora_cosmos_vault_final_v2';
  const location = useLocation();
  const navigate = useNavigate();

  const [entries, setEntries] = useState<DreamEntry[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [dictionary, setDictionary] = useState<PersonalWord[]>([]);
  
  const [systemMode, setSystemMode] = useState<SystemMode>('estudiante');
  const [profile, setProfile] = useState({
    role: 'estudiante' as UserRole,
    grade: 'Octavo – Noveno' as any,
    ageGroup: 'jóvenes' as AgeGroup,
    studentCode: 'BDS-' + Math.floor(1000 + Math.random() * 9000)
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSymbolSearchOpen, setIsSymbolSearchOpen] = useState(false);
  const [portalMessage, setPortalMessage] = useState<{ text: string, type: 'info' | 'error' | 'success' } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<WritingType | 'all'>('all');

  useEffect(() => {
    const init = async () => {
      await symbolDictionaryService.initializeIfEmpty();
      setDictionary(symbolDictionaryService.getAllSymbols());

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.entries)) setEntries(parsed.entries.sort((a: any, b: any) => b.timestamp - a.timestamp));
          if (Array.isArray(parsed.workshops)) setWorkshops(parsed.workshops);
        } catch (e) { 
          setEntries([]);
        }
      }
    };
    init();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ entries, workshops }));
  }, [entries, workshops]);

  const handleAddEntry = (entry: DreamEntry) => {
    setEntries([entry, ...entries]);
    setIsFormOpen(false);
    setPortalMessage({ text: normalizeSpanishText("Su palabra ha sido inscrita en el registro institucional."), type: 'success' });
    setTimeout(() => setPortalMessage(null), 4000);
  };

  const handleUpdateEntry = (updatedEntry: DreamEntry) => {
    setEntries(entries.map(e => e.id === updatedEntry.id ? updatedEntry : e));
  };

  const filteredEntries = useMemo(() => {
    const list = Array.isArray(entries) ? entries : [];
    return list.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || e.metadata.writingType === filterType;
      return matchesSearch && matchesType;
    });
  }, [entries, searchQuery, filterType]);

  const currentView = useMemo(() => {
    const path = location.pathname.substring(1);
    return (path || 'bitacora') as any;
  }, [location]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen pb-40 max-w-6xl mx-auto px-6 relative selection:bg-dorado-suave/20">
        
        <SymbolicLens onAddWordToDictionary={async (w) => {
          await symbolDictionaryService.addPersonalSymbol(w);
          setDictionary(symbolDictionaryService.getAllSymbols());
        }} />
        
        <AnimatePresence>
          {portalMessage && (
            <PortalMessage 
              message={portalMessage.text} 
              type={portalMessage.type} 
              onClose={() => setPortalMessage(null)} 
            />
          )}
        </AnimatePresence>
        
        <IdentificationBar profile={profile} onChange={setProfile} />
        
        <Header 
          onOpenForm={() => setIsFormOpen(true)} 
          currentView={currentView} 
          onToggleView={(v) => { navigate(`/${v}`); setIsFormOpen(false); }}
        />

        {currentView === 'bitacora' && entries.length > 0 && !isFormOpen && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12 flex justify-center">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-dorado-suave/40 group-focus-within:text-verde-salvia transition-colors" size={18} />
              <input 
                type="text" 
                placeholder={normalizeSystemText('Explorar memoria institucional...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-12 py-3.5 bg-white/40 border border-dorado-suave/10 rounded-xl focus:outline-none focus:border-dorado-suave focus:bg-white/80 transition-all text-base italic shadow-sm"
              />
            </div>
          </m.div>
        )}
        
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            {isFormOpen ? (
              <m.div 
                key="form-portal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-dorado-suave/5 relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-10 border-b border-azul-noche/5 pb-6">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-azul-noche serif-font italic">
                      {currentView === 'bitacora' ? normalizeSystemText('Inscribir palabra') : normalizeSystemText('Organizar encuentro')}
                    </h2>
                    <p className="text-[10px] font-bold text-dorado-suave italic tracking-wide">
                      {normalizeSystemText('La palabra es soberana')}
                    </p>
                  </div>
                  <button onClick={() => setIsFormOpen(false)} className="text-azul-noche/30 hover:text-azul-noche p-2 border border-azul-noche/5 rounded-lg transition-all hover:bg-marfil-cosmico">✕</button>
                </div>
                <DreamForm 
                  onSave={handleAddEntry} 
                  onErrorMessage={(m) => setPortalMessage({text: m, type: 'error'})} 
                  ageGroup={profile.ageGroup} 
                  userRole={profile.role} 
                  studentCode={profile.studentCode}
                  gradeLevel={profile.grade}
                />
              </m.div>
            ) : (
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                 <Routes>
                  <Route path="/" element={<Navigate to="/bitacora" />} />
                  <Route path="/purpose" element={<Purpose />} />
                  <Route path="/institucional" element={<PedagogicalDocument />} />
                  <Route path="/bitacora" element={
                    entries.length === 0 
                      ? <Welcome onStart={() => setIsFormOpen(true)} /> 
                      : <DreamList entries={filteredEntries} onDelete={(id) => setEntries(entries.filter(e => e.id !== id))} onUpdate={handleUpdateEntry} mode={systemMode} />
                  } />
                  <Route path="/talleres" element={<WorkshopList workshops={workshops} onDelete={(id) => setWorkshops(workshops.filter(w => w.id !== id))} onUpdate={() => {}} />} />
                  <Route path="/diccionario" element={<DiccionarioSimbolosScreen />} />
                  <Route path="/circulos" element={<WordCircle entries={entries} />} />
                  <Route path="/memoria" element={
                    <div className="space-y-12">
                       <header className="text-center space-y-4 mb-10">
                          <h3 className="text-xl font-bold text-azul-noche serif-font italic">{normalizeSystemText('Memoria histórica colectiva')}</h3>
                          <p className="text-sm text-azul-noche/60 italic">{normalizeSpanishText('Registro institucional para la custodia de la palabra soberana.')}</p>
                       </header>
                       <DreamList entries={entries} onDelete={(id) => setEntries(entries.filter(e => e.id !== id))} onUpdate={handleUpdateEntry} mode="profesor" />
                    </div>
                  } />
                  <Route path="/integracion" element={<IntegrationTable rows={entries} />} />
                  <Route path="/soporte" element={
                    <ResponsibleSupport 
                      tone={entries[0]?.readingLayer?.lecturaSimbolica?.tonoEmocional}
                      detectsDistress={entries[0]?.readingLayer?.tecnica?.emotionalDensity === 'profunda'}
                    />
                  } />
                </Routes>
              </m.div>
            )}
          </AnimatePresence>
        </main>

        <div className="fixed bottom-10 right-10 flex flex-col items-end gap-4 z-50">
          {!isFormOpen && (
            <>
              <m.button 
                whileHover={{ scale: 1.05 }} 
                onClick={() => navigate('/soporte')} 
                className="p-4 bg-white text-rosa-ceniza rounded-2xl shadow-xl border border-azul-noche/5 hover:bg-rosa-ceniza/5 transition-colors"
                title={normalizeSystemText('Sistema de cuidado')}
              >
                <Heart size={20} />
              </m.button>
              <m.button 
                whileHover={{ scale: 1.05 }} 
                onClick={() => setIsSymbolSearchOpen(true)} 
                className="p-4 bg-azul-noche text-dorado-suave rounded-2xl shadow-xl border border-dorado-suave/20 hover:bg-azul-noche/90 transition-colors"
                title={normalizeSystemText('Lupa simbólica')}
              >
                <Search size={20} />
              </m.button>
              <m.button 
                whileHover={{ scale: 1.02 }} 
                onClick={() => setIsFormOpen(true)} 
                className="px-10 py-4 bg-verde-salvia text-white rounded-2xl shadow-xl flex items-center gap-4 font-bold text-xs italic group hover:bg-verde-salvia/90 transition-all"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                <span>{normalizeSystemText('Inscribir')}</span>
              </m.button>
            </>
          )}
        </div>

        <AnimatePresence>
          {isSymbolSearchOpen && (
            <SymbolSearch 
              onClose={() => setIsSymbolSearchOpen(false)} 
              onAddWord={async (w) => { 
                await symbolDictionaryService.addPersonalSymbol(w); 
                setDictionary(symbolDictionaryService.getAllSymbols()); 
              }} 
            />
          )}
        </AnimatePresence>
        
        <footer className="mt-32 pt-10 border-t border-dorado-suave/10 text-center opacity-40 pb-20 flex flex-col items-center gap-4">
          <p className="text-[10px] text-azul-noche italic">
            Ser · Soberanía · Memoria · Casa común
          </p>
          <div className="flex items-center gap-3 text-[9px] text-azul-noche/40 font-medium italic">
            <span>Proyecto pedagógico de escritura consciente · Versión 1.0</span>
            <span className="w-1 h-1 rounded-full bg-dorado-suave opacity-30"></span>
            <Globe size={10} strokeWidth={1} />
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;