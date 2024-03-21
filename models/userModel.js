const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
    unique: true
  },

  password: {
    type: String,
    // required: true
  },

  email: {
    type: String,
    // required: true
  },

  dateOfBirth: {
    type: String,
    // required: true
  },

  displayName: {
    type: String,
    default: ''
    // required: true,
    // unique: true
  },

  profilePicture: {
    type: String,
    default: null
  },

  followers: {
    type: [String],
    default: []
  },

  blockedUsers: {
    type: [String],
    default: []
  },

  about: {
    type: String,
    default: null
  },

  interests: {
    type: [String],
    default: []
  },

  gender: {
    type: String,
    enum: ['Male', 'Female'],
    // required: true
  },

  socialLinks: {
    type: [String],
    default: []
  }
});

// userSchema.methods.hashPassword = async (password) => {
//   const hash = await bcrypt.hash(password, 10);
//   return hash;
// };

// userSchema.methods.validatePassword = async (password, hash) => {
//   const compare = await bcrypt.compare(password, hash);
//   return compare;
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
