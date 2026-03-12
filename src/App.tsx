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

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (

    <div className="min-h-screen">

      <Header
        onOpenForm={openForm}
        currentView={currentView}
        onToggleView={setCurrentView}
      />

      <div style={{ padding: "30px", maxWidth: "1100px", margin: "0 auto" }}>

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
          <div>
            <h2>Cuidado emocional</h2>
            <p>Espacio de acompañamiento respetuoso de la experiencia narrativa.</p>
          </div>
        )}

        {currentView === "purpose" && (
          <Purpose />
        )}

        {currentView === "institucional" && (
          <PedagogicalReference />
        )}

      </div>

    </div>

  );

}

export default App;
