import mongoose from "mongoose";

const ipgeoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    ip: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['IPv4', 'IPv6'],
        required: true
    },
    
    // Location
    continent: String,
    continent_code: String,
    country: {
        type: String,
        required: true
    },
    country_code: String,
    region: String,
    region_code: String,
    city: String,
    postal: String,
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    
    // Flag
    flag: {
        img: String,
        emoji: String,
        emoji_unicode: String
    },
    
    // Connection
    connection: {
        asn: Number,
        org: String,
        isp: String,
        domain: String
    },
    
    // Timezone
    timezone: {
        id: String,
        abbr: String,
        is_dst: Boolean,
        offset: Number,
        utc: String,
        current_time: String
    },
    
    // Additional
    capital: String
}, {
    collection: "ip_lookup",
    timestamps: true
});

const IPGeo = mongoose.model("IPGeo", ipgeoSchema);

export default IPGeo;