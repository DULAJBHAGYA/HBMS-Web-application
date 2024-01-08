const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true
  },
  bus: {
    type: String,
    required: true
  },
  station: {
    type: String,
    required: true
  },
  arr_time: {
    type: String,
    required: true
  },
  dep_time: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('posts2', postSchema);
