import React, { useEffect, useState } from "react";
import symbols from "./public/data/classicalSymbols.json";

interface Node {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
}

interface Props {
  symbol: any;
}

const SymbolGraph: React.FC<Props> = ({ symbol }) => {

  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {

    if (!symbol) return;

    const nodeList: Node[] = [];
    const linkList: Link[] = [];

    const center = symbol.symbol;

    nodeList.push({
      id: center,
      group: 1
    });

    // símbolos directamente relacionados
    const direct = symbols.filter((s: any) =>
      symbol.related &&
      symbol.related.includes(s.symbol)
    );

    direct.forEach((s: any) => {

      nodeList.push({
        id: s.symbol,
        group: 2
      });

      linkList.push({
        source: center,
        target: s.symbol
      });

    });

    // símbolos por categoría
    const categoryMatches = symbols.filter((s: any) =>
      s.category === symbol.category && s.symbol !== center
    );

    categoryMatches.slice(0,5).forEach((s: any) => {

      nodeList.push({
        id: s.symbol,
        group: 3
      });

      linkList.push({
        source: center,
        target: s.symbol
      });

    });

    setNodes(nodeList);
    setLinks(linkList);

  }, [symbol]);

  return (

    <div style={{ marginTop: 40 }}>

      <h3>Constelación simbólica</h3>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: 20
      }}>

        {nodes.map((node, i) => (

          <div
            key={i}
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid black",
              background: node.group === 1 ? "#000" : "#fff",
              color: node.group === 1 ? "#fff" : "#000"
            }}
          >
            {node.id}
          </div>

        ))}

      </div>

      <div style={{ marginTop: 20 }}>

        <h4>Relaciones simbólicas</h4>

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
