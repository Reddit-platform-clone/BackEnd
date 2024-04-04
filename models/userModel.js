const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = {
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  dateOfBirth: {
    type: String
  },

  displayName: {
    type: String
  },

  profilePicture: {
    type: String,
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
    type: String
  },

  interests: {
    type: [String],
    default: []
  },

  gender: {
    type: String,
    enum: ['Male', 'Female']
  },

  socialLinks: {
    type: [String],
    default: []
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
