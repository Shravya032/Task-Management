const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

// ------------------------------------------------------------------
// **UPDATED CODE HERE:** // We only load dotenv (which reads the local .env file) 
// if the environment is NOT 'production' (i.e., when running locally).
// This ensures Render uses its own MONGODB_URI variable first.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// ------------------------------------------------------------------

const app = express();
// Ensure PORT is available, Render will automatically set process.env.PORT
const PORT = process.env.PORT || 5000; 

// Middleware
// NOTE: This CORS setting allows ALL origins for now (app.use(cors())).
// After successful deployment, you MUST update this to restrict access 
// to only your Netlify frontend URL for security.
app.use(cors()); 
app.use(express.json());

// Database Connection
// Your code correctly uses the environment variable MO
mongoose.connect(process.env.MONGO_URI) 
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
