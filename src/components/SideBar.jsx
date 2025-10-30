import React, { useState, useEffect } from "react";
import nodeDetailsData from "../node_features.json";
import { fetchCpuCount } from "../utils/colorUtils"; // reuse your helper
import "./SideBar.css";

const Sidebar = ({ node, onClose }) => {
  const nodeInfo = nodeDetailsData[node];
  const [totalCores, setTotalCores] = useState(null);
  const [nodeData, setNodeData] = useState({});
  useEffect(() => {
    let isMounted = true; // to avoid setting state on unmounted component

    const fetchData = async () => {
      try {

		const res = await fetch(`/node_data.json?nocache=${Date.now()}`);
        const json = await res.json();
        if (isMounted) setNodeData(json);

        const cpuCount = await fetchCpuCount(node); // fetch from backend
        if (isMounted) setTotalCores(cpuCount); // cache locally in state
      } catch (error) {
        console.error("Error fetching total cores:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // refresh every 10s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [node]);

  return (
    <div className="sidebar">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2 style={{ fontWeight: 350 }}>{node}</h2>
      <div className="node-info" style={{ fontWeight: 250 }}>
        <p><strong>Features:</strong> {nodeInfo.features}</p>
        <p><strong>Partitions:</strong> {nodeInfo.partitions.join(", ")}</p>
        <p><strong>GRES:</strong> {nodeInfo.gres}</p>
      </div>
	  <div>Cores in use: {nodeData[node] ?? "Loading..."}</div>
      <div>Total Cores: {totalCores ?? "Loading..."}</div>
    </div>
  );
};
export default Sidebar;
