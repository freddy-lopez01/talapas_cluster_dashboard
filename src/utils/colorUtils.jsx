import nodeDetailsData from "../node_features.json";
import partitionColors from "../partitionColors.json";

// Helper function to fetch cpu_count from your Flask backend
export const fetchCpuCount = async (nodename) => {
  try {
    const res = await fetch(`http://toolbox.talapas.uoregon.edu:5000/api/cpu_count/${nodename}.talapas.uoregon.edu`, {
      headers: {
        "X-API-Key": process.env.REACT_APP_CPU_COUNT_API_KEY
      }
    });

	//console.log("Node Name:", nodename);
	//console.log("Response status:", res.status);
	//   console.log("Response headers:", [...res.headers.entries()]);
    if (!res.ok) throw new Error("Node not found");
    const data = await res.json();
    return data.cpu_count;
  } catch (err) {
    console.warn(`Error fetching cpu_count for ${nodename}:`, err);
    return null; // fallback
  }
};

export const getColor = async (nodename, coreValue, colorMode, cores) => {
  const nodeInfo = nodeDetailsData[nodename];

  if (!nodeInfo) {
    console.warn(`Node info not found in JSON for ${nodename}`);
    return "rgba(255, 0, 0, 0.5)";
  }

  //console.log("MaxCores:", maxCores)
  //if (maxCores === null) return "rgba(255, 0, 0, 0.5)"; // error fallback
  //if (maxCores === 1) return "rgba(220, 0, 45, 0.5)"; // error fallback

  switch (colorMode) {
    case "cores":
  	  const maxCores = await fetchCpuCount(nodename);
      if (coreValue === 0) return "rgba(210,210,210,0.4)";
      const minGreen = 400;
      const maxGreen = 80;
      const intensity = minGreen + Math.floor(((coreValue - 1) / (maxCores - 1)) * (maxGreen - minGreen));
      return `rgba(0, ${intensity}, 0, 0.5)`;

    case "partitions":
      if (!nodeInfo.partitions) return "rgba(255,255,0,0.3)";
      const nonPreemptPartition = nodeInfo.partitions.find(p => p !== "preempt");
      return nonPreemptPartition
        ? partitionColors.partitions[nonPreemptPartition] || "rgba(150,150,150,0.6)"
        : "rgba(255, 255, 0, 0.3)";

    case "architecture":
      return nodeInfo.features.includes("amd")
        ? partitionColors.architecture["amd"]
        : partitionColors.architecture["intel"];

    case "gpus":
      return nodeInfo.gres.includes("gpu")
        ? partitionColors.gpus["gpu"]
        : partitionColors.gpus["cpu only"];

    default:
      return "rgba(220,220,220,0.3)";
  }
};
