import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

function destroySong(songId, authToken) {
    return await makeRequest(`${apiUrl}/songs/${songId}`, {
      method: "delete",
      headers: { Authorization: `Bearer ${authToken}` },
      timeout: 3000
    });
}

export default destroySong;