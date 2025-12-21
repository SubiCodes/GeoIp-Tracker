import axios from "axios";

/**
 * Generate a small variation of an IPv4 or IPv6 address
 */
function generateCloseIP(ip) {
  if (ip.includes(".")) {
    const parts = ip.split(".").map(Number);
    const newParts = parts.map(p => {
      const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
      let val = p + delta;
      if (val < 0) val = 0;
      if (val > 255) val = 255;
      return val;
    });
    return newParts.join(".");
  } else if (ip.includes(":")) {
    const parts = ip.split(":");
    const newParts = parts.map(p => {
      const val = parseInt(p || "0", 16);
      const delta = Math.floor(Math.random() * 3) - 1;
      return ((val + delta) & 0xffff).toString(16);
    });
    return newParts.join(":");
  }
  return ip;
}

/**
 * Get N working IP close matches for a user query using ipwho.is
 * Runs API calls in parallel for speed
 */
export async function getWorkingCloseMatches(ip, count = 5, maxAttempts = 50, parallelBatch = 5) {
  const matches = [];
  let attempts = 0;

  while (matches.length < count && attempts < maxAttempts) {
    // Generate a batch of candidates
    const batch = Array.from({ length: parallelBatch }, () => generateCloseIP(ip));
    attempts += batch.length;

    // Run all API calls in parallel
    const results = await Promise.allSettled(
      batch.map(candidate => axios.get(`https://ipwho.is/${candidate}`))
    );

    for (const result of results) {
      if (matches.length >= count) break;
      if (result.status === "fulfilled" && result.value.data.success) {
        matches.push(result.value.data); // push full ipwho.is data
      }
    }
  }

  return matches;
}
