const express = require('express');
const path = require('path');
const passport = require('passport');

const jwtLoginStrategy = require('./passport/jwt');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const db = require('../db/config');

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/auth', authRoutes);

app.use(passport.initialize());
passport.use('jwt', jwtLoginStrategy);

app.use('/api', apiRoutes);


app.listen(process.env.PORT || 3001);
