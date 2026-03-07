import React, { useEffect, useState } from "react";
import symbols from "./public/data/classicalSymbols.json";

interface SymbolGraphProps {
  symbol: any;
}

const SymbolGraph: React.FC<SymbolGraphProps> = ({ symbol }) => {

  const [nodes, setNodes] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {

    if (!symbol) return;

    const mainSymbol = symbol.symbol;

    const related = symbols.filter((s: any) =>
      symbol.related &&
      symbol.related.includes(s.symbol)
    );

    const nodeList: any[] = [];
    const linkList: any[] = [];

    nodeList.push({
      id: mainSymbol,
      type: "center"
    });

    related.forEach((r: any) => {

      nodeList.push({
        id: r.symbol,
        type: "related"
      });

      linkList.push({
        source: mainSymbol,
        target: r.symbol
      });

    });

    setNodes(nodeList);
    setLinks(linkList);

  }, [symbol]);

  return (

    <div style={{ marginTop: 40 }}>

      <h3>Constelación simbólica</h3>

      <div style={{ marginTop: 20 }}>

        {nodes.map((n, i) => (

          <div
            key={i}
            style={{
              padding: "8px",
              border: "1px solid black",
              borderRadius: "10px",
              margin: "5px",
              display: "inline-block"
            }}
          >
            {n.id}
          </div>

        ))}

      </div>

      <div style={{ marginTop: 20 }}>

        <h4>Conexiones</h4>

        {links.map((l, i) => (

          <div key={i}>

            {l.source} → {l.target}

          </div>

        ))}

      </div>

    </div>
  );
};

export default SymbolGraph;
