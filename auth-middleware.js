
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import SessionToken from './models/session-token';

passport.use(new Strategy((jwt, done) => {
  SessionToken.find({ jwt }, (err, token) => {
    if (err) {
      return done(err);
    }
    done(null, token);
    return null;
  });
}));


export default passport.authenticate('bearer', { session: false });
