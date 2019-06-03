const { Strategy, ExtractJwt } = require('passport-jwt');
const Debug = require('debug');
const User = require('../../models/user');

const log = Debug('server:passport:jwt');

module.exports = new Strategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
}, (jwtPayload, done) => {
  log('jwt payload', jwtPayload);
  const { apiToken } = jwtPayload;
  log('apiToken', apiToken);
  User.findOne({ apiToken }, (err, user) => {
    log('user', user);
    if (err) {
      log('error finding user based on api token', err);
      return done(err, false);
    }
    if (user) {
      log('found user based on api token');
      return done(null, user);
    }
    log('no error but no user found based on api token');
    return done(null, false);
  });
});
