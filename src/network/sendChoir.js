import makeRequest from "./makeRequest";
import { apiUrl } from "../apiUrl";

export default async function sendChoir(choirData, authToken, options = {}) {
  // Options include:
  //    choirId
  //    abortSignal,
  //    timeout

  if (!options.choirId) {
    throw new Error("No choirId specified")
  }

  const method = options.choirId === "new" ? "POST" : "PATCH";
  console.log(options.choirId, method);
  const url = method === "PATCH" ? `${apiUrl}/choirs/${options.choirId}` : `${apiUrl}/choirs`;

  return await makeRequest(url, "json", {
    method: method,
    body: choirData,
    headers: { Authorization: `Bearer ${authToken}` },
    signal: options.abortSignal,
    timeout: options.timeout
  })
}