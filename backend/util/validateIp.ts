import { isIP } from "is-ip";

/**
 * Validates an IP address.
 * @param ip The IP string to validate
 * @returns the valid IP string
 * @throws Error if IP is missing or invalid
 */
export const validateIp = (ip?: string): string => {
  if (!ip) {
    throw new Error("IP required: Please provide an IP address.");
  }

  if (!isIP(ip)) {
    throw new Error("Invalid IP: Please provide a valid IPv4 or IPv6 address.");
  }

  return ip;
};
