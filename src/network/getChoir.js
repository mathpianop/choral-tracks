import {apiUrl} from "../apiUrl";
import makeRequest from "./makeRequest";

async function getChoir(choirId) {
  const apiEndpoint = `${apiUrl}/choirs/${choirId}`;
  //Timeout after 8 seconds
  return await makeRequest(apiEndpoint, "json", { timeout: 8000 });
}

export default getChoir;