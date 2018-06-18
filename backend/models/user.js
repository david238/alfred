const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};
