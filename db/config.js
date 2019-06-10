const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.connect('mongodb://localhost:27017/test', options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongodb connection open');
});

module.exports = db;
