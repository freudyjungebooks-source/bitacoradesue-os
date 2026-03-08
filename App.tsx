import React, { useState } from "react";

import Welcome from "./components/Welcome";
import DiccionarioSimbolosScreen from "./components/DiccionarioSimbolosScreen";
import DreamForm from "./components/DreamForm";
import DreamList from "./components/DreamList";
import PersonalDictionary from "./components/PersonalDictionary";
import SymbolGraph from "./SymbolGraph";

function App() {

  const [screen, setScreen] = useState("inicio");

  return (

    <div>

      <nav style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid #eee"
      }}>

        <button onClick={()=>setScreen("inicio")}>
          Inicio
        </button>

        <button onClick={()=>setScreen("diccionario")}>
          Diccionario simbólico
        </button>

        <button onClick={()=>setScreen("suenos")}>
          Bitácora de sueños
        </button>

        <button onClick={()=>setScreen("personal")}>
          Diccionario personal
        </button>

        <button onClick={()=>setScreen("mapa")}>
          Mapa simbólico
        </button>

      </nav>

      {screen === "inicio" && <Welcome />}

      {screen === "diccionario" && <DiccionarioSimbolosScreen />}

      {screen === "suenos" && (
        <>
          <DreamForm />
          <DreamList />
        </>
      )}

      {screen === "personal" && <PersonalDictionary />}

      {screen === "mapa" && <SymbolGraph />}

    </div>

  );

}

export default App;
