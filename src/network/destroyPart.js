import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

async function destroyPart(songId, partId, authToken, abortSignal) {
  console.log(authToken);
  return await makeRequest(`${apiUrl}/songs/${songId}/parts/${partId}`, "json", {
    method: "delete",
    headers: { Authorization: `Bearer ${authToken}` },
    timeout: 3000,
    signal: abortSignal
  }) 
}

export default destroyPart;