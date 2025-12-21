import SearchHistory from "../models/searchHistory.model.js";
import { getUserIdFromCookie } from "../util/getUserIdFromCookie.js";

export const addSearchQuery = async (req, res) => {
    const { query } = req.body;
    try {
        const id = await getUserIdFromCookie(req);
        let searchHistory = await SearchHistory.findOne({ user: id });
        if (!searchHistory) {
            searchHistory = new SearchHistory({ user: id, queries: [query] });
        } else {
            searchHistory.queries.push(query);
        }
        await searchHistory.save();
        return res.status(200).json({
            success: true,
            data: searchHistory,
            message: {
                title: 'Search history updated',
                suggestion: 'Query added to your search history.'
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
}