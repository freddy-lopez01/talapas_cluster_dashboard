import React, { useState, useEffect } from "react";
import "./App.css";
import NodeGrid from "./components/node.jsx";
import Sidebar from "./components/SideBar.jsx";
import NavBar from "./components/NavBar.jsx";
import ColorKey from "./components/ColorKey.jsx";

const ClusterDashboard = () => {
	const [selectedNode, setSelectedNode] = useState(null);
	const [colorMode, setColorMode] = useState("cores"); 
	const [keyMode, setKeyMode] = useState(false); 
 
	const [nodeCoresData, SetNodeCoreData] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const coresRes = await fetch(`./node_data.json?nocache=${Date.now()}`);
				const coresJson = await coresRes.json();
			 	SetNodeCoreData(coresJson )
			} catch (error) {
				console.error("Error fetching JSON data. RIP")
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 10000)
		return () => clearInterval(interval)

	}, []);
    
	const handleNodeClick = (nodename) => {
  		if (selectedNode === nodename) {
    		setSelectedNode(null); 
  		} else {
    		setSelectedNode(nodename);
  		}
	};

	const handleColorModeChange = (mode) => {
    	setColorMode(mode);
    };

	const handleKeyModeChange = (mode) => {
    	setKeyMode(prev => !prev);
    };

	const nodes = Object.keys(nodeCoresData);
    const cores = Object.values(nodeCoresData);

    return (
        <div className="dashboard-container">
			<NavBar/>
		    <div className="color-mode-buttons">
        		<button className="button-opt" onClick={() => handleColorModeChange("cores")}>Cores in Use</button>
        		<button className="button-opt" onClick={() => {
					handleColorModeChange("partitions"); 
				    }}
					>Partitions</button>
        		<button className="button-opt" onClick={() => handleColorModeChange("architecture")}>Architecture</button>
        		<button className="button-opt" onClick={() => handleColorModeChange("gpus")}>GPU</button>
        		<button className="legend-button" onClick={() => handleKeyModeChange(keyMode)}>Show legend</button>
      		</div>
		    {keyMode && <ColorKey keyMode={keyMode} colorMode={colorMode} />}
            <div className="grid-container" style={{ marginRight: selectedNode ? "300px" : "0" }}>

				<NodeGrid nodes={nodes} cores={cores} colorMode={colorMode} onNodeClick={handleNodeClick}/>
				{selectedNode && (
					<Sidebar node={selectedNode} onClose={() => setSelectedNode(null)} />
				)}
			</div>
        </div>
    );
};

export default ClusterDashboard;

