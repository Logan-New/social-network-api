const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/api/user'); // Ensure this is the correct path
const connection = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(connection.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err.message);
  });
