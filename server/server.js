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
// DATABASE
// =========================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() =>
        console.log(
            'MongoDB connected successfully'
        )
    )
    .catch((err) =>
        console.error(
            'MongoDB connection error:',
            err
        )
    );

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