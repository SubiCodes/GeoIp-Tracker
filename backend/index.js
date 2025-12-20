require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'GeoIP-Tracker backend running' });
});

app.get('/health', (req, res) => res.sendStatus(200));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  if (MONGO_URI) {
    const client = new MongoClient(MONGO_URI);
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      app.locals.db = client.db();
    } catch (err) {
      console.error('MongoDB connection failed:', err.message);
    }
  } else {
    console.log('No MONGO_URI provided — skipping DB connection');
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
