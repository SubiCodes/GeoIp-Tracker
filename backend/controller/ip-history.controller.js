import IPGeo from "../models/ipgeo.model.js";
import { isIP } from "is-ip";

export const addIPToHistory = async (req, res) => {
    const { ip } = req.body;
    try {
        const userId = await getUserIdFromCookie(req);
        const sameSavedIP = await IPGeo.findOne({ ip: ip, user: userId });
        if (sameSavedIP) {
            return res.status(200).json({
                success: true,
                data: sameSavedIP,
                message: {
                    title: "IP Already Saved",
                    suggestion: "This IP address is already in your history."
                }
            });
        };
        if (!isIP(ip)) {
            return res.status(400).json({
                success: false,
                message: {
                    title: "Invalid IP",
                    suggestion: "The provided IP address is not valid."
                }
            });
        };
        const ipGeoData = await fetch('https://ipwho.is/' + ip);
        const ipGeoJson = await ipGeoData.json();
        if (!ipGeoJson.success) {
            return res.status(400).json({
                success: false,
                message: {
                    title: "Invalid IP",
                    suggestion: "The provided IP address is invalid."
                }
            });
        };
        const newIPGeo = new IPGeo({
            ...ipGeoJson,
            user: userId
        });
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