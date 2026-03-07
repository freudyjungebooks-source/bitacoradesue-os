import React, { useState } from "react";
import SymbolSearch from "./components/SymbolSearch";
import SymbolGraph from "./SymbolGraph";

function App() {

  const [selectedSymbol, setSelectedSymbol] = useState<any | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleSymbolSelect = (symbol: any) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div style={{ padding: 20 }}>

      <h1>Atlas Simbólico</h1>

      <button
        onClick={() => setShowSearch(true)}
        style={{
          padding: "10px 20px",
          borderRadius: "20px",
          border: "1px solid black",
          cursor: "pointer"
        }}
      >
        Buscar símbolo
      </button>

      {showSearch && (
        <SymbolSearch
          onClose={() => setShowSearch(false)}
          onAddWord={() => {}}
          onSymbolSelect={handleSymbolSelect}
        />
      )}

      <div style={{ marginTop: 40 }}>
        {selectedSymbol && (
          <SymbolGraph symbol={selectedSymbol} />
        )}
      </div>

    </div>
  );
}

export default App;
