import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

async function destroyPart(songId, partId, authToken) {
  return await makeRequest({
    method: "delete",
    url: `${apiUrl}/songs/${songId}/parts/${partId}`,
    headers: { Authorization: `Bearer ${authToken}` },
    timeout: 3000
  }) 
}

export default destroyPart;