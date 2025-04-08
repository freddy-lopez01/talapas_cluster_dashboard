import nodeDetailsData from "../node_features.json";
import partitionColors from "../partitionColors.json";


export const getColor = (nodename, coreValue, colorMode, cores) => {
  const nodeInfo = nodeDetailsData[nodename];
  const maxCores = Math.max(...cores);

  switch (colorMode) {
    case "cores":
      if (coreValue === 0) return "rgba(210,210,210,0.4)";
      const minGreen = 400;
      const maxGreen = 80;

      const intensity = minGreen + Math.floor(((coreValue - 1) / (maxCores - 1)) * (maxGreen - minGreen));
      return `rgba(0, ${intensity}, 0, 0.5)`;

    case "partitions":
	  console.log(nodeInfo.partitions)
	  const nonPreemptPartition = nodeInfo.partitions.find(partition => partition !== "preempt");

  // If a non-preempt partition is found, return its associated color
      if (nonPreemptPartition) {
        return partitionColors[nonPreemptPartition] || "rgba(150,150,150,0.6)"; // Default color if partition not found in the map
      } else {
        return "rgba(255, 255, 0, 0.3)"; // Return a fallback color if all partitions are "preempt"
      }

    case "architecture":
      return nodeInfo.features.includes("amd")
        ? "rgba(255, 99, 132, 0.3)"
        : "rgba(75, 192, 192, 0.3)";

    case "gpu":
      return nodeInfo.gres.includes("gpu")
        ? "rgba(255, 165, 0, 0.4)"
        : "rgba(200, 200, 200, 0.3)";

    default:
      return "rgba(220,220,220,0.3)";
  }
};

