import axios from "axios";

/**
 * Complete a partial IP address to make it valid
 */
function completePartialIP(ip) {
  const trimmed = ip.trim();

  // Handle IPv4
  if (trimmed.includes(".") || !trimmed.includes(":")) {
    const parts = trimmed.split(".");

    // If we have fewer than 4 parts, pad with random values
    while (parts.length < 4) {
      parts.push(String(Math.floor(Math.random() * 256)));
    }

    // Ensure each part is a valid number between 0-255
    const validParts = parts.map(p => {
      const num = parseInt(p) || Math.floor(Math.random() * 256);
      return Math.min(255, Math.max(0, num));
    });

    return validParts.join(".");
  }

  // Handle IPv6
  if (trimmed.includes(":")) {
    const parts = trimmed.split(":");

    // If we have fewer than 8 parts, pad with random hex values
    while (parts.length < 8) {
      parts.push(Math.floor(Math.random() * 65536).toString(16));
    }

    // Ensure each part is valid hex (0-ffff)
    const validParts = parts.map(p => {
      const val = parseInt(p || "0", 16);
      return (isNaN(val) ? Math.floor(Math.random() * 65536) : val & 0xffff).toString(16);
    });

    return validParts.join(":");
  }

  // If it's just a number, treat it as the start of an IPv4
  const num = parseInt(trimmed);
  if (!isNaN(num)) {
    return `${Math.min(255, Math.max(0, num))}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  }

  // Default fallback
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

/**
 * Generate a small variation of an IPv4 or IPv6 address
 */
function generateCloseIP(ip) {
  // First, ensure we have a complete IP
  const completeIP = completePartialIP(ip);

  if (completeIP.includes(".")) {
    const parts = completeIP.split(".").map(Number);
    const newParts = parts.map(p => {
      const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
      let val = p + delta;
      if (val < 0) val = 0;
      if (val > 255) val = 255;
      return val;
    });
    return newParts.join(".");
  } else if (completeIP.includes(":")) {
    const parts = completeIP.split(":");
    const newParts = parts.map(p => {
      const val = parseInt(p || "0", 16);
      const delta = Math.floor(Math.random() * 3) - 1;
      return ((val + delta) & 0xffff).toString(16);
    });
    return newParts.join(":");
  }
  return completeIP;
}

/**
 * Get N working IP close matches for a user query using ipwho.is
 * Runs API calls in parallel for speed
 */
export async function getWorkingCloseMatches(ip, count = 5, maxAttempts = 50, parallelBatch = 5) {
  const matches = [];
  const seenIPs = new Set(); // Avoid duplicates
  
  // STEP 1: Always try the exact IP first
  try {
    const exactIP = completePartialIP(ip);
    const exactResult = await axios.get(`https://ipwho.is/${exactIP}`);
    
    if (exactResult.data.success) {
      matches.push(exactResult.data);
      seenIPs.add(exactIP);
    }
  } catch (error) {
    // If exact IP fails, continue to generate close matches
    console.log("Exact IP not found, generating close matches...");
  }
  
  // STEP 2: Generate close matches if needed
  let attempts = 0;
  
  while (matches.length < count && attempts < maxAttempts) {
    // Generate a batch of candidates
    const batch = [];
    for (let i = 0; i < parallelBatch; i++) {
      let candidate = generateCloseIP(ip);
      // Avoid duplicates
      while (seenIPs.has(candidate)) {
        candidate = generateCloseIP(ip);
      }
      seenIPs.add(candidate);
      batch.push(candidate);
    }
    
    attempts += batch.length;
    
    // Run all API calls in parallel
    const results = await Promise.allSettled(
      batch.map(candidate => axios.get(`https://ipwho.is/${candidate}`))
    );
    
    for (const result of results) {
      if (matches.length >= count) break;
      
      if (result.status === "fulfilled" && result.value.data.success) {
        matches.push(result.value.data);
      }
    }
  }
  
  return matches;
}