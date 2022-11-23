import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

async function getParts(songId, abortSignal) {
  const apiEndpoint = `${apiUrl}/songs/${songId}/parts`;
  // Timeout after 8 seconds
  return await makeRequest(apiEndpoint, "json", { timeout: 2000, signal: abortSignal})
}

export default getParts;