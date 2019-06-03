const { Strategy, ExtractJwt } = require('passport-jwt');
const Debug = require('debug');
const User = require('../../models/user');

const log = Debug('server:passport:jwt');

module.exports = new Strategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (jwtPayload, done) => {
  log('extracted jwt payload', jwtPayload);
  const { apiToken } = jwtPayload;
  User.findOne({ apiToken }, (err, user) => {
    if (err) {
      log('error finding user based on api token', err);
      return done(err, false);
    }
    if (user) {
      log('found user based on api token', user);
      return done(null, user);
    }
    log('no error but no user found based on api token');
    return done(null, false);
  });
});
