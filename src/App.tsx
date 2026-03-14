import React, { useState } from "react";

import Header from "./components/Header";
import Welcome from "./components/Welcome";

import DreamForm from "./components/DreamForm";
import DreamList from "./components/DreamList";

import DiccionarioSimbolosScreen from "./components/DiccionarioSimbolosScreen";
import PersonalDictionary from "./components/PersonalDictionary";

import WordCircle from "./components/WordCircle";
import WorkshopList from "./components/WorkshopList";

import PedagogicalDocument from "./components/PedagogicalDocument";
import Purpose from "./components/Purpose";
import PedagogicalReference from "./components/PedagogicalReference";

import SymbolGraph from "./SymbolGraph";

import { AppView } from "./types";

function App() {

  const [currentView, setCurrentView] = useState<AppView>("bitacora");
  const [showForm, setShowForm] = useState(false);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  return (

    <div className="min-h-screen bg-marfil-cosmico text-azul-noche">

      <Header
        onOpenForm={openForm}
        currentView={currentView}
        onToggleView={setCurrentView}
      />

      <main className="max-w-4xl mx-auto px-6 pb-16">

        {currentView === "bitacora" && (
          <>
            <Welcome />

            {showForm && (
              <div className="mb-8">
                <DreamForm onClose={closeForm}/>
              </div>
            )}

            <DreamList />
          </>
        )}

        {currentView === "diccionario" && (
          <div className="space-y-10">
            <DiccionarioSimbolosScreen />
            <SymbolGraph symbol={{symbol:"Agua", category:"Elemento", related:["flujo","emocion"]}} />
          </div>
        )}

        {currentView === "circulos" && (
          <WordCircle />
        )}

        {currentView === "talleres" && (
          <WorkshopList />
        )}

        {currentView === "memoria" && (
          <PersonalDictionary />
        )}

        {currentView === "integracion" && (
          <PedagogicalDocument />
        )}

        {currentView === "soporte" && (
          <section className="text-center py-10">
            <h2 className="text-xl serif-font italic mb-4">
              Cuidado emocional
            </h2>
            <p className="text-sm text-azul-noche/60">
              Espacio para reflexionar sobre la experiencia emocional que surge en la escritura.
            </p>
          </section>
        )}

        {currentView === "purpose" && (
          <Purpose />
        )}

        {currentView === "institucional" && (
          <PedagogicalReference />
        )}

      </main>

    </div>
  );

}

export default App;
