import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

async function getParts(songId) {
  const apiEndpoint = `${apiUrl}/songs/${songId}/parts`;
  // Timeout after 8 seconds
  return await makeRequest(apiEndpoint, "json", { timeout: 8000})
}

export default getParts;