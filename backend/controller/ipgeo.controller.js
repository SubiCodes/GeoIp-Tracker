import User from "../models/user.model.js";
import IPGeo from "../models/ipgeo.model.js";
import { validateIp } from "../util/validateIp.js";
import { getUserIdFromCookie } from "../util/getUserIdFromCookie.js";
import { v4 as uuidv4 } from 'uuid';

export const createIpGeo = async (req, res) => {
    const { ip, description } = req.body;
    try {
        //CHECK IF IP IS VALID
        const validIp = validateIp(ip);
        //CHECK IF USER EXISTS FROM COOKIE
        const userId = getUserIdFromCookie(req);
        //CHECK IF THERE IS ALREADY AN ENTRY FOR THIS IP AND USER
        const existingEntry = await IPGeo.findOne({ ip: validIp, user: userId });
        if (existingEntry) {
            return res.status(400).json({
                success: false,
                message: {
                    title: "Duplicate Entry",
                    suggestion: "An entry for this IP and user already exists."
                }
            });
        };
        //CALL THE GEOIP SERVICE AND CREATE THE ENTRY
        const ipgeo = await fetch('https://ipwho.is/' + validIp);
        console.log("Fetching IP Geo data for IP:", validIp);
    } catch (error) {
        const isUnauthorized = error.message.includes("Unauthorized");
        return res.status(isUnauthorized ? 401 : 400).json({
            success: false,
            message: {
                title: isUnauthorized ? "Unauthorized" : "Invalid request",
                suggestion: error.message
            }
        });
    }
};

export const getUserIpGeos = async (req, res) => {

};

export const updateIpGeo = async (req, res) => {

};

export const deleteIpGeo = async (req, res) => {

};