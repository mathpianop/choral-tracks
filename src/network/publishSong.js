import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

export default async function publishSong(songId, publish, authToken, abortSignal) {
  const publishData = new FormData();
  publishData.append("publish", publish);

  
  return await makeRequest(`${apiUrl}/songs/${songId}`, "json", {
    method: "PATCH",
    body: publishData,
    headers: { Authorization: `Bearer ${authToken}` },
    signal: abortSignal,
    timeout: 3000
  })
}