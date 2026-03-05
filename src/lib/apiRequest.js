export async function apiRequest(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    return res;
  } catch (err) {
    console.error("API Request error:", err);
    throw err;
  }
}
