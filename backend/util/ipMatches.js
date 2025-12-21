import axios from "axios";

/**
 * Generate a small variation of an IPv4 or IPv6 address
 */
function generateCloseIP(ip) {
  if (ip.includes(".")) {
    // IPv4
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
    // IPv6
    const parts = ip.split(":");
    const newParts = parts.map(p => {
      const val = parseInt(p || "0", 16);
      const delta = Math.floor(Math.random() * 3) - 1; // -1,0,+1
      const newVal = (val + delta) & 0xffff;
      return newVal.toString(16);
    });
    return newParts.join(":");
  }
  return ip; // fallback
}

/**
 * Get N working IP close matches for a user query using ipwho.is
 * @param {string} ip - user input IP
 * @param {number} count - number of matches to return
 * @param {number} maxAttempts - max attempts to find working IPs
 * @returns {Promise<string[]>} - array of working IPs
 */
export async function getWorkingCloseMatches(ip, count = 5, maxAttempts = 50) {
  const matches = new Set();
  let attempts = 0;

  while (matches.size < count && attempts < maxAttempts) {
    const candidate = generateCloseIP(ip);
    attempts++;

    try {
      const res = await axios.get(`https://ipwho.is/${candidate}`);
      if (res.data.success) {
        matches.add(candidate);
      }
    } catch (err) {
      // API failed, skip candidate
    }
  }

  return Array.from(matches);
}
