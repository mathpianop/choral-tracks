import {apiUrl} from "../apiUrl";


async function getAdminSongs(adminId, token) {
  //fetch songs from Rails API
    return  await makeRequest(`${apiUrl}/admins/${adminId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
}

export default getAdminSongs;

