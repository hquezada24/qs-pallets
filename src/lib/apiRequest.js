export async function apiRequest(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || `Error ${res.status}`);
    }

    return res;
  } catch (err) {
    console.error("apiRequest:", err);
    throw err;
  }
}
