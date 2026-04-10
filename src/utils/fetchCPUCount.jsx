import { cpuCountCache } from "./cpuCache";

export const fetchCpuCount = async (nodename) => {
  if (cpuCountCache[nodename]) return cpuCountCache[nodename];

  const res = await fetch(`/api/node_usage?nocache=${Date.now()}`)


  const data = await res.json();
  cpuCountCache[nodename] = data.cpu_count;
  return data.cpu_count;
};
