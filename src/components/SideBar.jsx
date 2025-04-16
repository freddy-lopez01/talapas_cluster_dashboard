import React, { useState, useEffect } from "react";
import nodeDetailsData from "../node_features.json";
import "./SideBar.css";

const Sidebar = ({ node, onClose }) => {
	const nodeInfo = nodeDetailsData[node];
	const [nodeCoresData, SetNodeCoreData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const coresRes = await fetch(`./node_data.json?nocache=${Date.now()}`);
				const coresJson = await coresRes.json();
			 	SetNodeCoreData(coresJson)
			} catch (error) {
				console.error("Error fetching JSON data. RIP")
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 10000)
		return () => clearInterval(interval)

	}, []);


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

