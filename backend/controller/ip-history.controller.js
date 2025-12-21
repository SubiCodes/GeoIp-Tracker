import IPGeo from "../models/ipgeo.model.js";
import { isIP } from "is-ip";
import axios from "axios";
import { getUserIdFromCookie } from "../util/getUserIdFromCookie.js";

export const addIPToHistory = async (req, res) => {
    const { ip } = req.body;

    try {
        const userId = await getUserIdFromCookie(req);

        // Check if already saved
        const existingIP = await IPGeo.findOne({ ip, user: userId });
        if (existingIP) {
            return res.status(200).json({
                success: true,
                data: existingIP,
                message: {
                    title: "IP Already Saved",
                    suggestion: "This IP address is already in your history."
                }
            });
        }

        // Validate IP
        if (!isIP(ip)) {
            return res.status(400).json({
                success: false,
                message: {
                    title: "Invalid IP",
                    suggestion: "The provided IP address is not valid."
                }
            });
        }

        // Fetch geo data
        const response = await axios.get(`https://ipwho.is/${ip}`);
        const ipGeoJson = response.data;

        if (!ipGeoJson.success) {
            return res.status(400).json({
                success: false,
                message: {
                    title: "Invalid IP",
                    suggestion: "The provided IP address is invalid."
                }
            });
        }

        // Save to DB
        const newIPGeo = new IPGeo({ ...ipGeoJson, user: userId });
        await newIPGeo.save();

        res.status(201).json({
            success: true,
            data: newIPGeo,
            message: {
                title: "IP Added",
                suggestion: "The IP address has been added to your history."
            }
        });

    } catch (error) {
        if (error.message?.includes('Unauthorized')) {
            return res.status(401).json({
                success: false,
                message: {
                    title: 'Unauthorized',
                    suggestion: 'You must be logged in to add IP history.'
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

export const getUserIPHistory = async (req, res) => {
    try {
        const userId = await getUserIdFromCookie(req);

        // Fetch all IPs saved by this user, sorted by newest first
        const ipHistory = await IPGeo.find({ user: userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: ipHistory,
            message: {
                title: "User IP history retrieved",
                suggestion: ipHistory.length
                    ? "All saved IPs have been retrieved."
                    : "No IPs have been saved yet."
            }
        });
    } catch (error) {
        if (error.message?.includes("Unauthorized")) {
            return res.status(401).json({
                success: false,
                message: {
                    title: "Unauthorized",
                    suggestion: "You must be logged in to view your saved IPs."
                }
            });
        }
        return res.status(400).json({
            success: false,
            message: {
                title: "Invalid request",
                suggestion: error.message || "An error occurred while fetching IP history."
            }
        });
    }
};


export const deleteMultipleIPs = async (req, res) => {
    const { ids } = req.body; // Array of IPGeo document IDs to delete

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            success: false,
            message: {
                title: "Invalid request",
                suggestion: "You must provide an array of IDs to delete."
            }
        });
    }

    try {
        const userId = await getUserIdFromCookie(req);

        // Fetch all IPs that match the given IDs and belong to this user
        const ipsToDelete = await IPGeo.find({ _id: { $in: ids }, user: userId });

        if (ipsToDelete.length === 0) {
            return res.status(404).json({
                success: false,
                message: {
                    title: "No matching IPs",
                    suggestion: "No IPs were found for deletion with the provided IDs."
                }
            });
        }

        // Delete the found IPs
        await IPGeo.deleteMany({ _id: { $in: ipsToDelete.map(ip => ip._id) } });

        return res.status(200).json({
            success: true,
            data: ipsToDelete.map(ip => ip._id),
            message: {
                title: "IPs deleted",
                suggestion: `${ipsToDelete.length} IP(s) have been successfully deleted from your history.`
            }
        });

    } catch (error) {
        if (error.message?.includes("Unauthorized")) {
            return res.status(401).json({
                success: false,
                message: {
                    title: "Unauthorized",
                    suggestion: "You must be logged in to delete IPs."
                }
            });
        }
        return res.status(400).json({
            success: false,
            message: {
                title: "Invalid request",
                suggestion: error.message || "An error occurred while deleting IPs."
            }
        });
    }
};