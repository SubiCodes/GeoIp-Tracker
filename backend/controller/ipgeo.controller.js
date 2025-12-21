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
        //CALL THE GEOIP SERVICE
        const response = await fetch('https://ipwho.is/' + validIp);
        if (!response.ok) {
            throw new Error(`Failed to fetch IP geo data: ${response.status}`);
        }
        const ipgeoData = await response.json();
        // Check if the API returned success: false
        if (!ipgeoData.success) {
            return res.status(400).json({
                success: false,
                message: {
                    title: "Invalid IP",
                    suggestion: "The IP geo service could not find data for this IP address."
                }
            });
        };

        //CREATE THE DATABASE ENTRY
        const newIpGeo = new IPGeo({
            ip: ipgeoData.ip,
            success: ipgeoData.success,
            type: ipgeoData.type,
            continent: ipgeoData.continent,
            continent_code: ipgeoData.continent_code,
            country: ipgeoData.country,
            country_code: ipgeoData.country_code,
            region: ipgeoData.region,
            region_code: ipgeoData.region_code,
            city: ipgeoData.city,
            latitude: ipgeoData.latitude,
            longitude: ipgeoData.longitude,
            is_eu: ipgeoData.is_eu,
            postal: ipgeoData.postal,
            calling_code: ipgeoData.calling_code,
            capital: ipgeoData.capital,
            borders: ipgeoData.borders,
            flag: ipgeoData.flag,
            connection: ipgeoData.connection,
            timezone: ipgeoData.timezone,
            description: description || "",
            user: userId
        });

        await newIpGeo.save();

        return res.status(200).json({
            success: true,
            data: newIpGeo,
            message: {
                title: "IP Geo Created",
                suggestion: "IP geo data has been successfully saved."
            },
        });
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
    try {
        const userId = getUserIdFromCookie(req);
        const ipgeos = await IPGeo.find({ user: userId });
        return res.status(200).json({
            success: true,
            data: ipgeos,
            message: {
                title: "IP Geos Retrieved",
                suggestion: "User's saved IP Geo data has been successfully retrieved."
            },
        });
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

export const updateIpGeo = async (req, res) => {

};

export const deleteIpGeo = async (req, res) => {

};