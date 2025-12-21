import SearchHistory from "../models/searchHistory.model.js";
import { getUserIdFromCookie } from "../util/getUserIdFromCookie.js";
import { getWorkingCloseMatches } from "../util/ipMatches.js";

export const addSearchQuery = async (req, res) => {
    const { query } = req.body;
    try {
        const userId = await getUserIdFromCookie(req);
        let searchHistory = await SearchHistory.findOne({ user: userId });
        if (!searchHistory) {
            searchHistory = new SearchHistory({ user: userId, queries: [query] });
        } else {
            searchHistory.queries = searchHistory.queries.filter(q => q !== query);
            searchHistory.queries.unshift(query);
            // Keep only the last 10 queries
            if (searchHistory.queries.length > 10) {
                searchHistory.queries = searchHistory.queries.slice(0, 10);
            }
        }

        await searchHistory.save();
        const closeMatches = await getWorkingCloseMatches(query, 5, 50, 10);

        return res.status(200).json({
            success: true,
            data: {
                searchHistory
            },
            resutls: closeMatches,
            message: {
                title: 'Search completed',
                suggestion: 'Query added to search history and close matches retrieved.'
            }
        });
    } catch (error) {
        if (error.message && error.message.includes('Unauthorized')) {
            return res.status(401).json({
                success: false,
                message: {
                    title: 'Unauthorized',
                    suggestion: 'You must be logged in to add search history.'
                }
            });
        }
        return res.status(400).json({
            success: false,
            message: {
                title: 'Invalid request',
                suggestion: error.message || 'An error occurred.'
            }
        });
    }
};

export const deleteSearchQuery = async (req, res) => {
    const { query } = req.body; // query to delete
    try {
        const userId = await getUserIdFromCookie(req);

        const searchHistory = await SearchHistory.findOne({ user: userId });
        if (!searchHistory) {
            return res.status(200).json({
                success: true,
                data: [],
                message: {
                    title: "No history",
                    suggestion: "No search history exists for this user."
                }
            });
        }

        // Remove the query
        searchHistory.queries = searchHistory.queries.filter(q => q !== query);
        await searchHistory.save();

        return res.status(200).json({
            success: true,
            data: searchHistory,
            message: {
                title: "Query deleted",
                suggestion: `The query "${query}" has been removed from your search history.`
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: {
                title: "Invalid request",
                suggestion: error.message || "An error occurred."
            }
        });
    }
};

export const getSearchHistory = async (req, res) => {
    try {
        const userId = await getUserIdFromCookie(req);

        const searchHistory = await SearchHistory.findOne({ user: userId });
        return res.status(200).json({
            success: true,
            data: searchHistory ? searchHistory.queries : [],
            message: {
                title: "Search history retrieved",
                suggestion: searchHistory
                    ? "Search history fetched successfully."
                    : "No search history exists yet."
            }
        });
    } catch (error) {
        if (error.message && error.message.includes("Unauthorized")) {
            return res.status(401).json({
                success: false,
                message: {
                    title: "Unauthorized",
                    suggestion: "You must be logged in to view search history."
                }
            });
        }
        return res.status(400).json({
            success: false,
            message: {
                title: "Invalid request",
                suggestion: error.message || "An error occurred."
            }
        });
    }
};
