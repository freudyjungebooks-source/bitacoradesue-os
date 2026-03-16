import React, { useState } from "react";

import Header from "./components/Header";
import IdentificationScreen from "./components/IdentificationScreen";
import Welcome from "./components/Welcome";

import DreamForm from "./components/DreamForm";
import DreamList from "./components/DreamList";

import DiccionarioSimbolosScreen from "./components/DiccionarioSimbolosScreen";
import PersonalDictionary from "./components/PersonalDictionary";

import WordCircle from "./components/WordCircle";
import WorkshopList from "./components/WorkshopList";

import PedagogicalDocument from "./components/PedagogicalDocument";
import PedagogicalReference from "./components/PedagogicalReference";
import Purpose from "./components/Purpose";

import SymbolGraph from "./SymbolGraph";

import { AppView, UserProfile } from "./types";

function App() {

  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [currentView, setCurrentView] = useState<AppView>("bitacora");

  const [showForm, setShowForm] = useState(false);

  const openForm = () => setShowForm(true);

  const closeForm = () => setShowForm(false);

  // pantalla inicial
  if (!profile) {
    return (
      <IdentificationScreen
        onComplete={(data) =>
          setProfile({
            ...data,
            studentCode: Date.now().toString()
          })
        }
      />
    );
  }

  return (

    <div className="min-h-screen bg-marfil-cosmico">

      <Header
        onOpenForm={openForm}
        currentView={currentView}
        onToggleView={setCurrentView}
      />

      <main className="max-w-4xl mx-auto px-6 py-10">

        {currentView === "bitacora" && (
          <>
            <Welcome />

            {showForm && (
              <DreamForm onClose={closeForm}/>
            )}

            <DreamList />
          </>
        )}

        {currentView === "diccionario" && (
          <>
            <DiccionarioSimbolosScreen />
            <SymbolGraph symbol={{symbol:"Agua", category:"Elemento", related:["flujo","emocion"]}} />
          </>
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
          <div className="text-center">
            <h2 className="text-xl serif-font italic">
              Cuidado emocional
            </h2>
            <p className="text-sm text-azul-noche/60 mt-4">
              Espacio de reflexión sobre la experiencia emocional de la escritura.
            </p>
          </div>
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
