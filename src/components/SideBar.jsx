import React, { useState, useEffect } from "react";
import nodeDetailsData from "../node_features.json";
import { fetchCpuCount } from "../utils/fetchCPUCount.jsx"; // reuse your helper
import "./SideBar.css";
import { cpuCountCache } from "../utils/cpuCache";


const Sidebar = ({ node, cores, onClose }) => {
  const [totalCores, setCores] = useState(cpuCountCache[node] ?? null); // use cache if available

  useEffect(() => {
    const loadCores = async () => {
      if (!cpuCountCache[node]) {
        console.log("Cache miss, fetching...");
        const fetchedCores = await fetchCpuCount(node);
        console.log("Fetched cores:", fetchedCores);
        setCores(fetchedCores);
      } else {
        console.log("Cache hit:", cpuCountCache[node]);
        setCores(cpuCountCache[node]);
      }
    };

    loadCores();
  }, [node]);

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
	  <div>Cores in use: {cores ?? "Loading..."}</div>
      <div>Total Cores: {totalCores ?? "Loading..."}</div>
    </div>
  );
};
export default Sidebar;
