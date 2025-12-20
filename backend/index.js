import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: [(process.env.FRONTEND_URI || 'http://localhost:5173'), 'http://localhost:3000'],
    credentials: true
}));

app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'GeoIP-Tracker backend running' });
});

app.get('/health', (req, res) => res.sendStatus(200));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
    app.listen(PORT, () => {
        connectDB();
        console.log(`Server listening on port ${PORT}`);
    });
}

start().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
