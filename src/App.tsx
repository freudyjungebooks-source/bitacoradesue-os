import React, { useState } from "react";

import Welcome from "./components/Welcome";
import DiccionarioSimbolosScreen from "./components/DiccionarioSimbolosScreen";
import DreamForm from "./components/DreamForm";
import DreamList from "./components/DreamList";
import PersonalDictionary from "./components/PersonalDictionary";

import SymbolGraph from "./SymbolGraph";

// módulos pedagógicos
import PedagogicalDocument from "./components/PedagogicalDocument";
import PedagogicalReference from "./components/PedagogicalReference";
import WorkshopList from "./components/WorkshopList";
import WritingRefinement from "./components/WritingRefinement";

function App() {

  const [screen, setScreen] = useState("inicio");

  return (

    <div style={{fontFamily:"serif"}}>

      <nav
        style={{
          display:"flex",
          gap:"14px",
          padding:"18px",
          borderBottom:"1px solid #eaeaea",
          flexWrap:"wrap"
        }}
      >

        <button onClick={()=>setScreen("inicio")}>
          inicio
        </button>

        <button onClick={()=>setScreen("bitacora")}>
          bitácora
        </button>

        <button onClick={()=>setScreen("simbolos")}>
          símbolos
        </button>

        <button onClick={()=>setScreen("circulos")}>
          círculos
        </button>

        <button onClick={()=>setScreen("talleres")}>
          talleres
        </button>

        <button onClick={()=>setScreen("memoria")}>
          memoria
        </button>

        <button onClick={()=>setScreen("curriculo")}>
          currículo
        </button>

        <button onClick={()=>setScreen("cuidado")}>
          cuidado
        </button>

        <button onClick={()=>setScreen("proposito")}>
          propósito
        </button>

        <button onClick={()=>setScreen("referente")}>
          referente
        </button>

        <button onClick={()=>setScreen("diccionario")}>
          diccionario simbólico
        </button>

        <button onClick={()=>setScreen("personal")}>
          diccionario personal
        </button>

        <button onClick={()=>setScreen("mapa")}>
          mapa simbólico
        </button>

      </nav>

      <div style={{padding:"30px"}}>

        {screen === "inicio" && <Welcome />}

        {screen === "bitacora" && (
          <>
            <DreamForm />
            <DreamList />
          </>
        )}

        {screen === "simbolos" && <DiccionarioSimbolosScreen />}

        {screen === "circulos" && <WritingRefinement />}

        {screen === "talleres" && <WorkshopList />}

        {screen === "memoria" && <PedagogicalDocument />}

        {screen === "curriculo" && <PedagogicalReference />}

        {screen === "cuidado" && <PersonalDictionary />}

        {screen === "proposito" && <PersonalDictionary />}

        {screen === "referente" && <PersonalDictionary />}

        {screen === "diccionario" && <DiccionarioSimbolosScreen />}

        {screen === "personal" && <PersonalDictionary />}

        {screen === "mapa" && <SymbolGraph />}

      </div>

    </div>

  );

}

export default App;
