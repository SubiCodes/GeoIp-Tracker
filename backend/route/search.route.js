import { Router } from "express";
import {
  addSearchQuery,
  getSearchHistory,
  deleteSearchQuery,
  getIPSuggestions
} from "../controller/search-history.controller.js";

const searchRouter = Router();

// Add a search query and return close matches
searchRouter.post("/", addSearchQuery);

// Get full search history (returns [] if none)
searchRouter.get("/", getSearchHistory);

// Delete a specific search query
searchRouter.post("/delete", deleteSearchQuery);

// Generate IP suggestions (does not save to history)
searchRouter.post("/suggestions", getIPSuggestions);

export default searchRouter;
