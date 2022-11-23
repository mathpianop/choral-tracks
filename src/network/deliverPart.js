import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

async function sendPartAbstract(method, songId, partId, partData, authToken, abortSignal) {
  await makeRequest(`${apiUrl}/songs/${songId}/parts/${partId}`, {
    method: method,
    data: partData,
    headers: { Authorization: `Bearer ${authToken}` },
    signal: abortSignal,
    timeout: 60000
  })
}

function post(songId, partId, partData, authToken, abortController) {
  sendPartAbstract("post", songId, partId, partData, authToken, abortController);
}

function patch(songId, partId, partData, authToken, abortController) {
  sendPartAbstract("patch", songId, partId, partData, authToken, abortController);
}


export default {post, patch};



