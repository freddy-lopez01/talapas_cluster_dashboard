import React, { useEffect, useState } from 'react';

import "./Node.css"
import { getColor } from "../utils/colorUtils";

const NodeGrid = ({ nodes, cores, colorMode, onNodeClick}) => {
    //const maxCores = Math.max(...cores);
    
	//const getColor = (value) => {
    //	if (value === 0) return "rgba(210,210,210, 0.4)"; // White for 0 cores
    //	const minGreen = 400; // Lightest green (for 1 core)
    //	const maxGreen = 80;
    	// Scale intensity from minGreen to maxGreen
    //	const intensity = minGreen + Math.floor(((value - 1) / (maxCores - 1)) * (maxGreen - minGreen));
    
	//return `rgba(0, ${intensity}, 0, 0.5)`;
	//};

  
  return (
    <div className="image-grid">
      {nodes.map((nodename, index) => (
        <div key={index} className="image-item" 
		     style={{backgroundColor: getColor(nodename, cores[index], "cores", cores), transitionDelay: `${index * 25}ms` }} 
		     onClick={() => onNodeClick(nodename)}>
		  <h5 style={{ fontWeight: 350 }}>{nodename}</h5>
		  <h6 style={{ fontWeight: 200 }}>{cores[index]} Cores</h6> 
        </div>
	  ))}
    </div>
  );
};

export default NodeGrid;
