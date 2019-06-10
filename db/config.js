const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

module.exports = function connectDb() {
  return mongoose.connect('mongodb://localhost:27017/test', options);
};
