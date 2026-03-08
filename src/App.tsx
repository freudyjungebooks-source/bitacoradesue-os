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

    <div style={{fontFamily:"serif", minHeight:"100vh", background:"#fafafa"}}>

      {/* MENÚ PRINCIPAL */}
      <nav
        style={{
          display:"flex",
          gap:"18px",
          padding:"20px",
          borderBottom:"1px solid #eaeaea",
          flexWrap:"wrap",
          justifyContent:"center",
          background:"white"
        }}
      >

        <button onClick={()=>setScreen("inicio")}>
          inicio
        </button>

        <button onClick={()=>setScreen("diccionario")}>
          diccionario simbólico
        </button>

        <button onClick={()=>setScreen("suenos")}>
          bitácora de sueños
        </button>

        <button onClick={()=>setScreen("personal")}>
          diccionario personal
        </button>

        <button onClick={()=>setScreen("mapa")}>
          atlas simbólico
        </button>

      </nav>

      {/* CONTENIDO PRINCIPAL */}

      <div style={{padding:"40px"}}>

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
