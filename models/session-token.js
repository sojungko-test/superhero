const mongoose = require('mongoose');

const sessionTokenSchema = new mongoose.Schema({
  jwt: String,
  userToken: String,
});

const SessionToken = mongoose.model('SessionToken', sessionTokenSchema);

module.exports = SessionToken;
