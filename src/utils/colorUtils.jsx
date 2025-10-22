import nodeDetailsData from "../node_features.json";
import partitionColors from "../partitionColors.json";

export const getColor = (nodename, coreValue, colorMode, cores) => {
  const nodeInfo = nodeDetailsData[nodename];
  // If nodeInfo doesn't exist or has no core_count, flag it red
  if (!nodeInfo || typeof nodeInfo.core_count !== "number") {
    console.warn(`Parsing error or missing data for node: ${nodename}`);
    return "rgba(255, 0, 0, 0.5)"; // red for error
  }

  console.log(nodename, nodeInfo["core_count"])
  const maxCores = nodeInfo["core_count"]

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
        return partitionColors.partitions[nonPreemptPartition] || "rgba(150,150,150,0.6)";
      } else {
        return "rgba(255, 255, 0, 0.3)";
      }

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

