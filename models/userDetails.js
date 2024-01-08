const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema(
  {
    fullName: String,
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    mobile: { type: String, unique: true },
    password: String,
  },
  {
    collection: 'UserInfo',
  }
);

module.exports = mongoose.model('UserInfo', userInfoSchema);

