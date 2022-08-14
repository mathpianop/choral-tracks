import makeRequest from "./makeRequest";

async function getPartBuffer(partUrl) {
  // Convert extension to .mp3 before fetching from Cloudinary
  const splitArray = partUrl.split(".");
  splitArray.splice((splitArray.length - 1), 1, 'mp3')
  const newUrl = splitArray.join(".");
  
  const request = new Request(newUrl);
  // Timeout after 8 seconds
  return await makeRequest(request, "arrayBuffer", { timeout: 8000});
}

export default getPartBuffer;