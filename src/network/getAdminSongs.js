import {apiUrl} from "../apiUrl";
import makeRequest from "./makeRequest"


async function getAdminSongs(choirId, token) {
  //fetch songs from Rails API
    const choirEdit = await makeRequest(`${apiUrl}/choirs/${choirId}/edit`, "json", {
      headers: { Authorization: `Bearer ${token}` }
    });

    return choirEdit.songs
}

export default getAdminSongs;

