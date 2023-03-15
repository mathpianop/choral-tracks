import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

export default async function destroyChoir(choirId, authToken, abortSignal) {  
  return await makeRequest(`${apiUrl}/choirs/${choirId}`, "json", {
    method: "delete",
    headers: { Authorization: `Bearer ${authToken}` },
    timeout: 3000,
    signal: abortSignal
  });
}