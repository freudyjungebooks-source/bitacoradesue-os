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

        {screen === "circulos" && (
          <div>
            <h2>Círculos de escritura</h2>
            <p>Espacio para el diálogo simbólico y la escritura colectiva.</p>
          </div>
        )}

        {screen === "talleres" && (
          <div>
            <h2>Talleres</h2>
            <p>Actividades pedagógicas para fortalecer la escritura y la interpretación simbólica.</p>
          </div>
        )}

        {screen === "memoria" && (
          <div>
            <h2>Memoria</h2>
            <p>Archivo de experiencias narrativas y memoria simbólica.</p>
          </div>
        )}

        {screen === "curriculo" && (
          <div>
            <h2>Currículo</h2>
            <p>Integración pedagógica con los lineamientos educativos.</p>
          </div>
        )}

        {screen === "cuidado" && (
          <div>
            <h2>Cuidado</h2>
            <p>Espacio para la reflexión emocional y el autocuidado narrativo.</p>
          </div>
        )}

        {screen === "proposito" && (
          <div>
            <h2>Propósito</h2>
            <p>Construcción del proyecto de vida a través de la palabra.</p>
          </div>
        )}

        {screen === "referente" && (
          <div>
            <h2>Referente</h2>
            <p>Marco simbólico: Freud, Jung, Popol Vuh, pensamiento maya, arquetipos universales.</p>
          </div>
        )}

        {screen === "diccionario" && <DiccionarioSimbolosScreen />}

        {screen === "personal" && <PersonalDictionary />}

        {screen === "mapa" && <SymbolGraph />}

      </div>

    </div>

  );

}

export default App;
