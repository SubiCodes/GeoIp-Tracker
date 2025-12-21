import mongoose from "mongoose";

const ipgeoSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    unique: true
  },
  success: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  continent: {
    type: String,
    required: true
  },
  continent_code: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  country_code: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  region_code: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  is_eu: {
    type: Boolean,
    required: true
  },
  postal: {
    type: String
  },
  calling_code: {
    type: String
  },
  capital: {
    type: String
  },
  borders: {
    type: String
  },
  flag: {
    img: { type: String },
    emoji: { type: String },
    emoji_unicode: { type: String }
  },
  connection: {
    asn: { type: Number },
    org: { type: String },
    isp: { type: String },
    domain: { type: String }
  },
  timezone: {
    id: { type: String },
    abbr: { type: String },
    is_dst: { type: Boolean },
    offset: { type: Number },
    utc: { type: String },
    current_time: { type: String }
  },
  description: {
    type: String,
    default: ""
  },
  // New: reference to User who owns this IPGeo
  user: {
    type: String,
    ref: "User",
    required: true
  }
}, {
  collection: "ipgeo",
  timestamps: true
});

const IPGeo = mongoose.model("IPGeo", ipgeoSchema);
export default IPGeo;
