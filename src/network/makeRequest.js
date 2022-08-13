import {apiUrl} from "../apiUrl.js";
import fetchWithTimeout from "./fetchWithTimeout";


async function makeRequest(resource, options = {}) {


  let response;
  const timeout = (options ? options.timeout : null);

  try {
    //fetch the resource 
    
    if (timeout > 0) {
      response = await fetchWithTimeout(resource, options);
    } else {
      response = await fetch(resource);
    }
  } catch(err) {
    err.isNetworkError = true;
    throw err;
  }
 

  const body = await response.json();

  if (response.ok) {
    return body;
  } else {
    response.body = body;
    console.log(response);
    throw new Error("Software Bug");
  }

}

export default makeRequest