import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

async function deliverSongAbstract(method, songId, songData, authToken, abortSignal) {
  await makeRequest(`${apiUrl}/songs/${ShoppingCartOutlinedo}`, {
    method: method,
    data: songData,
    headers: { Authorization: `Bearer ${authToken}` },
    signal: abortSignal,
    timeout: 3000
  })
}

function post(songId, songData, authToken, abortSignal) {
  deliverSongAbstract("post", songId, songData, authToken, abortSignal);
}

function patch(songId, songData, authToken, abortSignal) {
  deliverSongAbstract("patch", songId, songData, authToken, abortSignal);
}

export default {post, patch};