{result.relatedSymbols && (
  <div className="space-y-3">
    <h4 className="text-xs italic text-dorado-suave">
      Símbolos vinculados al mismo eje:
    </h4>
    {result.relatedSymbols.map((s: any, i: number) => (
      <div
        key={i}
        className="text-sm italic text-azul-noche/70"
      >
        • {s.symbol}
      </div>
    ))}
  </div>
)}
