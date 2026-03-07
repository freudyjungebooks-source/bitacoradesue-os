import { useState } from "react";
import SymbolSearch from "./components/SymbolSearch";
import SymbolGraph from "./components/SymbolGraph";

function App() {

  const [selectedSymbol, setSelectedSymbol] = useState(null);

  return (
    <div style={{ padding: 20 }}>

      <h1>Atlas Simbólico</h1>

      <SymbolSearch onSelectSymbol={setSelectedSymbol} />

      <hr style={{ margin: "40px 0" }} />

      <h2>Mapa Simbólico Interactivo</h2>

      {selectedSymbol && (
        <SymbolGraph symbol={selectedSymbol} />
      )}

    </div>
  );
}

export default App;
