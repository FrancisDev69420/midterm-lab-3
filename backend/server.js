// 1. Imports and setup
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// 4. Routes 
app.use('/api/users', require('./routes/userRoutes'));

// 5. Basic route (for testing)
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// 6. Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});