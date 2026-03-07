import React, { useState, useEffect } from "react";
import { symbolDictionaryService } from "../services/symbolDictionaryService";
import { PersonalWord, SymbolicCategory } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const m = motion as any;

interface SymbolSearchProps {
  onClose: () => void;
  onAddWord: (word: PersonalWord) => void;
  onSymbolSelect?: (symbol: any) => void;
}

const SymbolSearch: React.FC<SymbolSearchProps> = ({
  onClose,
  onAddWord,
  onSymbolSelect
}) => {

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [personalMeaning, setPersonalMeaning] = useState("");

  useEffect(() => {
    symbolDictionaryService.initializeIfEmpty();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setIsLoading(true);

    const res = symbolDictionaryService.searchSymbol(query.trim());

    setResult(res);

    if (res && onSymbolSelect) {
      onSymbolSelect(res);
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center px-6">

      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      ></div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-white rounded-2xl w-full max-w-2xl p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          ✕
        </button>

        <h3 className="text-xl italic text-center mb-6">
          Atlas Simbólico Cultural y Pedagógico
        </h3>

        <form onSubmit={handleSearch} className="mb-8">

          <div className="relative">

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Explora un símbolo..."
              className="w-full border rounded-full px-6 py-3"
            />

            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <Search size={18} />
            </button>

          </div>

        </form>

        {isLoading && (
          <p className="text-center">Buscando símbolo...</p>
        )}

        <AnimatePresence>

          {result && (

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >

              <div>
                <h4 className="font-semibold">Perspectiva cultural</h4>
                <p className="italic">{result.mainDefinition}</p>
              </div>

              <div>
                <h4 className="font-semibold">Capa arquetípica</h4>
                <p className="italic">{result.archetypalLayer}</p>
              </div>

              <div>
                <h4 className="font-semibold">Dimensión transformativa</h4>
                <p className="italic">{result.transformativeDimension}</p>
              </div>

              {result.emotionalAlert && (
                <div className="bg-yellow-100 p-4 rounded-xl text-sm">
                  Este símbolo puede estar vinculado a momentos sensibles.
                  ¿Deseas hablar con alguien de confianza o buscar acompañamiento profesional?
                </div>
              )}

              <div>

                <h4 className="font-semibold">
                  Tu significado personal
                </h4>

                <textarea
                  value={personalMeaning}
                  onChange={(e) =>
                    setPersonalMeaning(e.target.value)
                  }
                  placeholder="¿Qué representa este símbolo en tu momento actual?"
                  className="w-full border rounded-xl p-4 mt-2"
                />

              </div>

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

                  onClose();
                }}
                className="w-full py-3 bg-black text-white rounded-full"
              >
                Guardar en mi diccionario
              </button>

            </m.div>

          )}

        </AnimatePresence>

      </m.div>

    </div>
  );
};

export default SymbolSearch;
