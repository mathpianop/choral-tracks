import {apiUrl} from "../apiUrl";
import makeRequest from "./makeRequest"


async function getEditableSongs(choirId, token, abortSignal) {
  //fetch songs from Rails API
    const choirEdit = await makeRequest(`${apiUrl}/choirs/${choirId}/edit`, "json", {
      headers: { Authorization: `Bearer ${token}` },
      signal: abortSignal
    });

    return choirEdit.songs
}

export default getEditableSongs;

