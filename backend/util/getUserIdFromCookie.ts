import jwt from "jsonwebtoken";
import { Request } from "express";

/**
 * Extracts the userId from a JWT stored in cookies.
 * @param req Express request object
 * @param cookieName Name of the cookie storing the JWT (default: "authToken")
 * @returns userId as string
 * @throws Error if no token or invalid token
 */
export const getUserIdFromCookie = (req: Request, cookieName = "authToken"): string => {
  const token = req.cookies?.[cookieName];

  if (!token) {
    throw new Error("Unauthorized: No auth cookie found");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch (err) {
    throw new Error("Unauthorized: Invalid or expired token");
  }
};
