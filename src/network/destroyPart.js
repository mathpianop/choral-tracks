import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

async function destroyPart(songId, partId, authToken) {
  console.log(authToken);
  return await makeRequest(`${apiUrl}/songs/${songId}/parts/${partId}`, "json", {
    method: "delete",
    headers: { Authorization: `Bearer ${authToken}` },
    timeout: 3000
  }) 
}

export default destroyPart;