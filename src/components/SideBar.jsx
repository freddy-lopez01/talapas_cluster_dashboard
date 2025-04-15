import React from "react";
import nodeDetailsData from "../node_features.json";
import nodeCoresData from "../node_data.json";
import "./SideBar.css";

const Sidebar = ({ node, cores, onClose }) => {
	const nodeInfo = nodeDetailsData[node];
  return (
    <div className="sidebar">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2 style={{ fontWeight: 350 }}>{node}</h2>
	  <div className="node-info" style={{ fontWeight: 250 }}>
  		<p><strong>Features:</strong> {nodeInfo.features}</p>
  		<p><strong>Partitions:</strong> {nodeInfo.partitions.join(", ")}</p>
  		<p><strong>GRES:</strong> {nodeInfo.gres}</p>
	  </div>
	  <div>Cores in use: {nodeCoresData[node]}</div>
	  <div>Total Cores: {nodeInfo["core_count"]}</div>

    </div>
  );
};

export default Sidebar;

