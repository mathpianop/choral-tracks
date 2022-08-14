//This is lifted from a Dmitri Pavlutin article

async function fetchWithTimeout(resource, options = {}) {
  const { timeout } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    signal: controller.signal,
    ...options
  });
  clearTimeout(id);
  return response;
}

export default fetchWithTimeout;