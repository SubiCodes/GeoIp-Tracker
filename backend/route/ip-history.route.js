import { Router } from "express";
import {
  addIPToHistory,
  getUserIPHistory,
  deleteMultipleIPs
} from "../controller/ip-history.controller.js";

const ipRouter = Router();

// Add a new IP to user's history
ipRouter.post("/", addIPToHistory);

// Get all saved IPs for the logged-in user
ipRouter.get("/", getUserIPHistory);

// Delete multiple IPs at once
ipRouter.post("/delete", deleteMultipleIPs);

export default ipRouter;
