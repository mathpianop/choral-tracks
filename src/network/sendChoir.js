import makeRequest from "./makeRequest";
import { apiUrl } from "../apiUrl";

export default async function sendChoir(choirData, authToken, options = {}) {
  // Options include:
  //    choirId
  //    abortSignal,
  //    timeout

  const method = options.choirId ? "PATCH" : "POST";
  console.log(options.choirId, method);
  const url = options.choirId ? `${apiUrl}/choirs/${options.choirId}` : `${apiUrl}/choirs`;

  return await makeRequest(url, "json", {
    method: method,
    body: choirData,
    headers: { Authorization: `Bearer ${authToken}` },
    signal: options.abortSignal,
    timeout: options.timeout
  })
}