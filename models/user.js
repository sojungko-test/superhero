const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  apiToken: { type: String, required: true }, // user's access token to legacy api
});

const User = mongoose.model('User', userSchema);

module.exports = User;
