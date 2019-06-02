
const { Strategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const SessionToken = require('./models/session-token');

module.exports = new Strategy({
  secretOrKey: 'shhhhhh',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (jwt, done) => {
  console.log('jwt', jwt);
  SessionToken.find({ jwt }, (err, token) => {
    if (err) {
      console.log('err', err);
      return done(err);
    }
    console.log('token', token);
    done(null, token);
    return null;
  });
});

