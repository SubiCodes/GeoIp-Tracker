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
 * Returns the full ipwho.is data for each IP
 */
export async function getWorkingCloseMatches(ip, count = 5, maxAttempts = 50) {
  const matches = [];
  let attempts = 0;

  while (matches.length < count && attempts < maxAttempts) {
    const candidate = generateCloseIP(ip);
    attempts++;

    try {
      const res = await axios.get(`https://ipwho.is/${candidate}`);
      if (res.data.success) {
        matches.push(res.data); // push full ipwho.is data
      }
    } catch (err) {
      // skip failed IP
    }
  }

  return matches;
}
