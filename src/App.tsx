import SymbolSearch from "./components/SymbolSearch";
import SymbolGraph from "./components/SymbolGraph";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <SymbolSearch />
      <hr style={{ margin: "40px 0" }} />
      <h2>Mapa Simbólico Interactivo</h2>
      <SymbolGraph />
    </div>
  );
}

export default App;
