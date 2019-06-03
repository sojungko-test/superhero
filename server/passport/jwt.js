// const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../../models/user');

module.exports = new Strategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (jwtPayload, done) => {
  const { apiToken } = jwtPayload;
  User.findOne({ apiToken }, (err, user) => {
    if (err) {
      console.log('err', err);
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

// module.exports = passport.authenticate('jwt', { session: false });
