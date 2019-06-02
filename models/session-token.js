const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const sessionTokenSchema = new mongoose.Schema({
  jwt: String, // actual session token
  apiToken: String, // user's access token to legacy api
});


sessionTokenSchema.pre('save', function generateJwt(next) {
  const sessionToken = this;
  return new Promise((resolve, reject) => {
    jwt.sign({ apiToken: this.apiToken }, 'shhhhhh', { algorithm: 'HS256' }, (err, jwt) => {
      if (err) {
        return reject(err);
      }
      resolve(jwt);
    });
  })
    .then((jwt) => {
      sessionToken.jwt = jwt;
      next();
    })
    .catch((err) => {
      console.log('error', err);
    });
});

const SessionToken = mongoose.model('SessionToken', sessionTokenSchema);

module.exports = SessionToken;
