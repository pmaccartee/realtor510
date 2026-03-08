import { fetchDeploymentLogs } from './.local/skills/fetch-deployment-logs/fetch-logs.js';
async function run() {
  const result = await fetchDeploymentLogs({ messageContext: { lines: 10, limit: 5 } });
  if (result.found) {
    console.log(result.logs.substring(0, 3000));
  } else {
    console.log("No logs found");
  }
}
run().catch(console.error);
