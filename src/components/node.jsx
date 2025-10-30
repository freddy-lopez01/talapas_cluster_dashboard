import React, { useEffect, useState } from 'react';
import "./Node.css";
import { getColor } from "../utils/colorUtils";

const NodeGrid = ({ nodes, cores, colorMode, onNodeClick }) => {
  const [nodeColors, setNodeColors] = useState({}); // { nodename: color }
  useEffect(() => {
    // Fetch colors for all nodes asynchronously
    const fetchColors = async () => {
      const colors = {};
      for (let i = 0; i < nodes.length; i++) {
        const nodename = nodes[i];
        const coreValue = cores[i];
        colors[nodename] = await getColor(nodename, coreValue, colorMode, cores);
      }
      setNodeColors(colors);
    };

    fetchColors();
  }, [nodes, cores, colorMode]);

  return (
    <div className="image-grid">
      {nodes.map((nodename, index) => (
        <div
          key={index}
          className="image-item"
          style={{
            backgroundColor: nodeColors[nodename] || "rgba(210,210,210,0.4)", // fallback while loading
            transitionDelay: `${index * 1}ms`
          }}
          onClick={() => onNodeClick(nodename)}
        >
          <h5 style={{ fontWeight: 350 }}>{nodename}</h5>
          <h6 style={{ fontWeight: 200 }}>{cores[index]} Cores</h6>
        </div>
      ))}
    </div>
  );
};

export default NodeGrid;

