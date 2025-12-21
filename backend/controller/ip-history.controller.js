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
