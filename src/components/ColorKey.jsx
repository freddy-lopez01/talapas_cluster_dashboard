import React from 'react';
import "./ColorKey.css";
import partitionColors from "../partitionColors.json";

const ColorKey = ({ keyMode, colorMode}) => {
  console.log(colorMode)
  return (
    <div className="color-key-grid">
	  {Object.entries(partitionColors[colorMode]).map(([group, color], index) => (
        <div key={index} className="key-item">
		  <div className="color-box" style={{backgroundColor: color}}></div>
		  {group}
		</div> 
      ))}
    </div>
  );
};

export default ColorKey;

