const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRoutes =
    require('./routes/taskRoutes');

const authRoutes =
    require('./routes/authRoutes');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

const PORT =
    process.env.PORT || 5000;

// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());

// =========================
// DATABASE & SERVERLESS CONNECTION
// =========================

let isConnected = false;

async function connectDB() {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable is missing on Vercel');
    }

    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log('MongoDB connected successfully');
}

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('MongoDB connection error:', err);
        return res.status(500).json({
            error: 'Database connection error: ' + err.message
        });
    }
});

// =========================
// ROUTES
// =========================

app.use(
    '/api/auth',
    authRoutes
);

app.use(
    '/api/tasks',
    taskRoutes
);

// =========================
// SERVER
// =========================

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(
            `Server is running on port ${PORT}`
        );
    });
}

module.exports = app;