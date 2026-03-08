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

    <div style={{fontFamily:"serif"}}>

      <nav
        style={{
          display:"flex",
          gap:"16px",
          padding:"18px",
          borderBottom:"1px solid #eaeaea",
          flexWrap:"wrap"
        }}
      >

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

      <div style={{padding:"30px"}}>

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

    </div>

  );

}

export default App;
