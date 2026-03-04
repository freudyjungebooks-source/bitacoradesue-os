import React, { useState, useEffect } from "react";

const SymbolSearch = () => {
  const [query, setQuery] = useState("");
  const [symbols, setSymbols] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetch("/classicalSymbols.json")
      .then(res => res.json())
      .then(data => setSymbols(data));
  }, []);

  const handleSearch = () => {
    const found = symbols.find(
      s => s.symbol.toLowerCase() === query.toLowerCase()
    );
    setResult(found || null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Exploración simbólica</h2>

      <input
        type="text"
        placeholder="Escribe un símbolo..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Buscar</button>

      {result && (
        <div style
