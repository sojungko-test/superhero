
const passport = require('passport');
const { Strategy } = require('passport-http-bearer');
const SessionToken = require('./models/session-token');

passport.use(new Strategy((jwt, done) => {
  SessionToken.find({ jwt }, (err, token) => {
    if (err) {
      return done(err);
    }
    done(null, token);
    return null;
  });
}));

module.exports = passport.authenticate('bearer', { session: false });
