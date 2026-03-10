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
          bitácora de sueños
        </button>

        <button onClick={()=>setScreen("simbolos")}>
          diccionario simbólico
        </button>

        <button onClick={()=>setScreen("personal")}>
          diccionario personal
        </button>

        <button onClick={()=>setScreen("mapa")}>
          mapa simbólico
        </button>

        <button onClick={()=>setScreen("circulos")}>
          círculos de escritura
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

        {screen === "personal" && <PersonalDictionary />}

        {screen === "mapa" && (
          <div>
            <h2>Mapa simbólico</h2>
            <p>Explora las relaciones entre símbolos.</p>
            <SymbolGraph symbol={{symbol:"Agua", category:"Elemento", related:["flujo","emocion"]}} />
          </div>
        )}

        {screen === "circulos" && (
          <div>
            <h2>Círculos de escritura</h2>
            <p>
            Espacio de diálogo simbólico donde los participantes comparten
            relatos y reflexiones.
            </p>
          </div>
        )}

        {screen === "talleres" && (
          <div>
            <h2>Talleres pedagógicos</h2>
            <p>
            Actividades de escritura y exploración simbólica para estudiantes
            y adultos.
            </p>
          </div>
        )}

        {screen === "memoria" && (
          <div>
            <h2>Memoria narrativa</h2>
            <p>
            Archivo de experiencias, relatos y reflexiones que fortalecen la
            memoria simbólica.
            </p>
          </div>
        )}

        {screen === "curriculo" && (
          <div>
            <h2>Currículo pedagógico</h2>
            <p>
            Integración del proyecto con los lineamientos educativos y el
            desarrollo de habilidades del lenguaje.
            </p>
          </div>
        )}

        {screen === "cuidado" && (
          <div>
            <h2>Cuidado emocional</h2>
            <p>
            Espacio para reflexionar sobre la experiencia emocional que surge
            en la escritura.
            </p>
          </div>
        )}

        {screen === "proposito" && (
          <div>
            <h2>Propósito de vida</h2>
            <p>
            Reflexiones sobre el sentido personal y el camino de cada
            estudiante.
            </p>
          </div>
        )}

        {screen === "referente" && (
          <div>
            <h2>Referentes simbólicos</h2>
            <p>
            Freud, Jung, Popol Vuh, pensamiento maya, mitología y tradición
            simbólica universal.
            </p>
          </div>
        )}

      </div>

    </div>

  );

}

export default App;
