import React, { useState, useEffect } from "react";
import nodeCoresData from "./node_data.json";
import "./App.css";
import NodeGrid from "./components/node.jsx";
import Sidebar from "./components/SideBar.jsx";
import NavBar from "./components/NavBar.jsx";

const ClusterDashboard = () => {
	const [selectedNode, setSelectedNode] = useState(null);

    const nodes = Object.keys(nodeCoresData);
    const cores = Object.values(nodeCoresData);
    
	const handleNodeClick = (nodename) => {
  		if (selectedNode === nodename) {
    		setSelectedNode(null); 
  		} else {
    		setSelectedNode(nodename);
  		}
	};
	const [colorMode, setColorMode] = useState("cores"); // NEW

    return (
        <div className="dashboard-container">
			<NavBar/>
            <div className="grid-container" style={{ marginRight: selectedNode ? "300px" : "0" }}>

				<NodeGrid nodes={nodes} cores={cores} onNodeClick={handleNodeClick}/>

				{selectedNode && (
					<Sidebar node={selectedNode} onClose={() => setSelectedNode(null)} />
				)}

			</div>
        </div>
    );
};

export default ClusterDashboard;

