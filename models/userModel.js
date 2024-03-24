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
  },

  profilePicture: {
    type: String,
    default: null
  },

  followers: {
    type: [String],
    default: []
  },

  friends: {
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


const User = mongoose.model('User', userSchema);

module.exports = User;
