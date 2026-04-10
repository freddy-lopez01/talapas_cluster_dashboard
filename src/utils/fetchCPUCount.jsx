import { cpuCountCache } from "./cpuCache";

export const fetchCpuCount = async (nodename) => {
  //if (cpuCountCache[nodename]) return cpuCountCache[nodename];

  //const res = await fetch(`http://toolbox.talapas.uoregon.edu:5000/api/cpu_count/${nodename}.talapas.uoregon.edu`, {
  //  headers: { "X-API-Key": process.env.REACT_APP_CPU_COUNT_API_KEY }
  //});
  const res = await fetch(`/api/cpu_count/${nodename}.talapas.uoregon.edu`);
  const data = await res.json();
  cpuCountCache[nodename] = data.cpu_count;
  return data.cpu_count;
};
