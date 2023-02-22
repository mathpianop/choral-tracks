import {apiUrl} from "../apiUrl";
import makeRequest from "./makeRequest";

async function getAdmin(adminId, token, abortSignal) {
  const apiEndpoint = `${apiUrl}/admins/${adminId}`;
  //Timeout after 8 seconds
  return await makeRequest(apiEndpoint, "json", { 
    timeout: 8000, 
    signal: abortSignal,
    headers: { Authorization: `Bearer ${token}` }
  });
}

export default getAdmin;