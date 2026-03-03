import React, { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

const SymbolGraph = () => {
  const [data, setData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    fetch("/data/classicalSymbols.json")
      .then(res => res.json())
      .then(symbols => {

        const nodes: any[] = [];
        const links: any[] = [];

        const addedTraditions = new Set<string>();
        const addedProcess = new Set<string>();

        symbols.forEach((symbol: any) => {

          // Nodo símbolo
          nodes.push({
            id: symbol.symbol,
            type: "symbol"
          });

          // Nodo eje de proceso
          if (symbol.processAxis && !addedProcess.has(symbol.processAxis)) {
            nodes.push({
              id: symbol.processAxis,
              type: "process"
            });
            addedProcess.add(symbol.processAxis);
          }

          if (symbol.processAxis) {
            links.push({
              source: symbol.symbol,
              target: symbol.processAxis
            });
          }

          // Nodo tradiciones culturales
          symbol.culturalComparative?.forEach((c: any) => {

            if (!addedTraditions.has(c.tradition)) {
              nodes.push({
                id: c.tradition,
                type: "tradition"
              });
              addedTraditions.add(c.tradition);
            }

            links.push({
              source: symbol.symbol,
              target: c.tradition
            });

          });

        });

        setData({ nodes, links });
      });
  }, []);

  return (
    <div style={{ height: "600px", border: "1px solid #ccc", marginTop: 20 }}>
      <ForceGraph2D
        graphData={data}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;

          if (node.type === "symbol") ctx.fillStyle = "#1e293b";
          if (node.type === "process") ctx.fillStyle = "#047857";
          if (node.type === "tradition") ctx.fillStyle = "#7c3aed";

          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
          ctx.fill();

          ctx.fillStyle = "#000";
          ctx.fillText(label, node.x + 8, node.y + 4);
        }}
      />
    </div>
  );
};

export default SymbolGraph;
