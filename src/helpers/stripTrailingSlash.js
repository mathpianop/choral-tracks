function stripTrailingSlash(url) {
  if (url.charAt(url.length - 1) !== "/") {
    return url;
  } else {
    return stripTrailingSlash(url.slice(0,-1));
  }
}

export default stripTrailingSlash;