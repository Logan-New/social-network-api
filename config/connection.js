const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social-network');

module.exports = mongoose.connection;
