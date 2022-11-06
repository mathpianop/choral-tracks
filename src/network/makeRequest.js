import fetchWithTimeout from "./fetchWithTimeout";


async function makeRequest(resource, parser, options = {}) {

  let response;
  const timeout = (options ? options.timeout : null);

  try {
    //fetch the resource 
    if (timeout > 0) {
      response = await fetchWithTimeout(resource, options);
    } else {
      response = await fetch(resource, options);
    }
  } catch(err) {
    //attach isNetworkError flag for fetch error
    err.isNetworkError = true;
    throw err;
  }
 
  const body = await response[parser]();

  if (response.ok) {
    return body;
    //For 401 unauthorized response, throw error with isUnauthorized flag
  } else if(response.status === 401) {
    const err = new Error(response.message);
    err.isUnauthorized = true
    throw err
    //For all other non-2xx responses, throw error and log response to console for debugging
  } else {
    response.bodyContent = body;
    console.log(response);
    throw new Error("Software Bug");
  }

}

export default makeRequest