/**
 * Get N working IP close matches for a user query using ipwho.is
 * ALWAYS checks the exact IP first, then adds close matches
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
  
  // STEP 2: If we still need more results, generate close matches
  let attempts = 0;
  
  while (matches.length < count && attempts < maxAttempts) {
    // Generate a batch of candidates
    const batch = Array.from({ length: parallelBatch }, () => {
      let candidate;
      do {
        candidate = generateCloseIP(ip);
      } while (seenIPs.has(candidate)); // Avoid duplicates
      
      seenIPs.add(candidate);
      return candidate;
    });
    
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