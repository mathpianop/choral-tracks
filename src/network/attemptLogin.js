import { apiUrl } from "../apiUrl";
import makeRequest from "./makeRequest";

async function attemptLogin(username, password) {
   //Create, fill, and post Login FormData
   const params = new FormData();
   params.append("password", password)
   params.append("username", username)

   //Timeout after 4 seconds
   return await makeRequest(`${apiUrl}/admins/login`, "json", {
     method: "post",
     body: params,
     timeout: 4000
   });
}

export default attemptLogin;