const express = require('express');
const path = require('path');
const passport = require('passport');
const Debug = require('debug');

const connectDb = require('../db/config');

const jwtLoginStrategy = require('./passport/jwt');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const { PORT } = process.env;

const log = Debug('server:server');

function createApp() {
  const app = express();

  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  // serve static files
  app.use(express.static(path.join(__dirname, 'public')));

  // initialize passport
  app.use(passport.initialize());
  passport.use('jwt', jwtLoginStrategy);

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // login routes
  app.use('/auth', authRoutes);

  // authenticated routes
  app.use('/api', passport.authenticate('jwt', { session: false }), apiRoutes);

  // general server errors
  // IMPORTANT: requires four arguments to work as error handler
  app.use((err, req, res, next) => {
    log('server error:', err.stack);

    res.status(500).send({
      error: 'server error',
    });
  });
  return app;
}

module.exports = {
  createApp,
  createServer({ port = PORT, cb = () => {} }) {
  // connect to db first
    connectDb()
      .then(() => {
        const app = createApp();

        app.listen(port, () => {
          log(`Server is listening on ${port}`);
          cb();
        });
      });
  },
};
