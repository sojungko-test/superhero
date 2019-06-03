const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  apiToken: String, // user's access token to legacy api
});

const User = mongoose.model('User', userSchema);

module.exports = User;
