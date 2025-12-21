import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import cookieParser from "cookie-parser";
import userAuthRouter from './route/user-auth.route.js';
import searchRouter from './route/search.route.js';
import ipRouter from './route/ip-history.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [(process.env.FRONTEND_URI || 'http://localhost:5173'), 'http://localhost:3000'],
    credentials: true
}));

app.use('/auth', userAuthRouter);
app.use('/search', searchRouter);
app.use('/ip-history', ipRouter);

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
