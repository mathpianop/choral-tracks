import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

function destroySong(songId, authToken, abortSignal) {
    return await makeRequest(`${apiUrl}/songs/${songId}`, {
      method: "delete",
      headers: { Authorization: `Bearer ${authToken}` },
      signal: abortSignal,
      timeout: 3000
    });
}

export default destroySong;