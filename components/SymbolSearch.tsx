import React, { useState, useEffect } from "react";
import { symbolDictionaryService } from "../services/symbolDictionaryService";
import { PersonalWord, SymbolicCategory } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const m = motion as any;

interface SymbolSearchProps {
  onClose?: () => void;
  onAddWord?: (word: PersonalWord) => void;
}

const SymbolSearch: React.FC<SymbolSearchProps> = ({
  onClose,
  onAddWord
}) => {

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [symbols, setSymbols] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [personalMeaning, setPersonalMeaning] = useState("");

  useEffect(() => {
    symbolDictionaryService.initializeIfEmpty();

    fetch("/data/classicalSymbols.json")
      .then(res => res.json())
      .then(data => setSymbols(data));

  }, []);

  useEffect(() => {

    if (!query) {
      setSuggestions([]);
      return;
    }

    const q = query.toLowerCase();

    const matches = symbols.filter((s: any) =>
      s.symbol.toLowerCase().startsWith(q)
    );

    setSuggestions(matches.slice(0, 6));

  }, [query, symbols]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setIsLoading(true);

    const res = symbolDictionaryService.searchSymbol(query.trim());

    setResult(res);

    setIsLoading(false);
  };

  const selectSuggestion = (symbol: string) => {

    setQuery(symbol);

    const res = symbolDictionaryService.searchSymbol(symbol);

    setResult(res);

    setSuggestions([]);
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto" }}>

      <h3 style={{ textAlign: "center", marginBottom: 20 }}>
        Atlas Simbólico Cultural y Pedagógico
      </h3>

      <form onSubmit={handleSearch} style={{ position: "relative" }}>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Explora un símbolo..."
          style={{
            width: "100%",
            padding: "12px 20px",
            borderRadius: 30,
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            position: "absolute",
            right: 10,
            top: 6,
            border: "none",
            background: "transparent",
            cursor: "pointer"
          }}
        >
          <Search size={18} />
        </button>

      </form>

      {suggestions.length > 0 && (

        <div
          style={{
            border: "1px solid #eee",
            borderRadius: 10,
            marginTop: 10,
            padding: 10,
            background: "#fff"
          }}
        >

          {suggestions.map((s, i) => (

            <div
              key={i}
              onClick={() => selectSuggestion(s.symbol)}
              style={{
                padding: "8px 10px",
                cursor: "pointer"
              }}
            >
              {s.symbol}
            </div>

          ))}

        </div>

      )}

      <AnimatePresence>

        {result && (

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: 30 }}
          >

            <h4>Perspectiva cultural</h4>
            <p>{result.mainDefinition}</p>

            <h4>Capa arquetípica</h4>
            <p>{result.archetypalLayer}</p>

            <h4>Dimensión transformativa</h4>
            <p>{result.transformativeDimension}</p>

            <div style={{ marginTop: 20 }}>
              <h4>Tu significado personal</h4>

              <textarea
                value={personalMeaning}
                onChange={(e) => setPersonalMeaning(e.target.value)}
                placeholder="¿Qué representa este símbolo en tu momento actual?"
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #ccc"
                }}
              />
            </div>

            {onAddWord && (
              <button
                onClick={() => {

                  onAddWord({
                    id: Date.now().toString(),
                    word: result.symbol,
                    meaning: result.mainDefinition,
                    definicionPersonal: personalMeaning,
                    definicionAcademica: result.mainDefinition,
                    category: result.category as SymbolicCategory,
                    origin: "personal",
                    resonanciaEmocional: result.emotionalResonance,
                    createdAt: new Date().toISOString()
                  });

                  if (onClose) onClose();

                }}
                style={{
                  marginTop: 20,
                  padding: 10,
                  width: "100%",
                  background: "black",
                  color: "white",
                  borderRadius: 20
                }}
              >
                Guardar en mi diccionario
              </button>
            )}

          </m.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default SymbolSearch;
