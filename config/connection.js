const mongoose = require('mongoose');

// MongoDB URI
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/social-network';

module.exports = {
  mongoURI,
};
