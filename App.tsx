import { useState } from "react";
import SymbolSearch from "./components/SymbolSearch";
import SymbolGraph from "./components/SymbolGraph";

function App() {

  const [symbol, setSymbol] = useState(null);

  return (
    <div style={{ padding: 20 }}>

      <h1>Atlas Simbólico</h1>

      <SymbolSearch onSymbolSelect={setSymbol} />

      <hr style={{ margin: "40px 0" }} />

      <h2>Mapa simbólico</h2>

      {symbol && <SymbolGraph symbol={symbol} />}

    </div>
  );
}

export default App;
