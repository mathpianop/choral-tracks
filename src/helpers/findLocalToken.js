export default function findLocalToken() {
  try {
    //Try to return token from localStorage
    return localStorage.getItem("token");
  } catch (err) {
    console.log("Couldn't find token");
    //If not permitted (because of Chrome Incognito 3rd-party, etc.), return null
    return null;
  }
}