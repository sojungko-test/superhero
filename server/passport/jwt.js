const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../../models/user');

passport.use(new Strategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (jwtPayload, done) => {
  console.log('jwtPayload', jwtPayload);
  const { apiToken } = jwtPayload;
  User.find({ apiToken }, (err, token) => {
    if (err) {
      console.log('err', err);
      return done(err);
    }
    console.log('token', token);
    done(null, token);
    return null;
  });
}));

module.exports = passport.authenticate('jwt', { session: false });
