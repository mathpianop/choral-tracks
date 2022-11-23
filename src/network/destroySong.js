import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

async function destroySong(songId, authToken, abortSignal) {
    return await makeRequest(`${apiUrl}/songs/${songId}`, "json", {
      method: "delete",
      headers: { Authorization: `Bearer ${authToken}` },
      timeout: 3000,
      signal: abortSignal
    });
}

export default destroySong;