import React from 'react';

import "./Node.css"
import { getColor } from "../utils/colorUtils";

const NodeGrid = ({ nodes, cores, colorMode, onNodeClick}) => {
  return (
    <div className="image-grid">
      {nodes.map((nodename, index) => (
        <div key={index} className="image-item" 
		     style={{backgroundColor: getColor(nodename, cores[index], colorMode, cores), transitionDelay: `${index * 1}ms` }} 
		     onClick={() => onNodeClick(nodename)}>
		  <h5 style={{ fontWeight: 350 }}>{nodename}</h5>
		  <h6 style={{ fontWeight: 200 }}>{cores[index]} Cores</h6> 
        </div>
	  ))}
    </div>
  );
};

export default NodeGrid;
