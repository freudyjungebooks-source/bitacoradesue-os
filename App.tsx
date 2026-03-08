import React from "react";
import SymbolSearch from "./components/SymbolSearch";
import SymbolGraph from "./SymbolGraph";

function App() {
  return (
    <div style={{ padding: 20 }}>
      
      <h1>Atlas Simbólico Cultural</h1>

      <p>
        Exploración simbólica inspirada en Jung, Campbell y la tradición
        de los diccionarios simbólicos clásicos.
      </p>

      <SymbolSearch />

      <hr style={{ margin: "40px 0" }} />

      <h2>Mapa simbólico</h2>

      <SymbolGraph />

    </div>
  );
}

export default App;
