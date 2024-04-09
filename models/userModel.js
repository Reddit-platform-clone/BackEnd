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
    required: true
  },

  dateOfBirth: {
    type: String,
    required: true
  },

  displayName: {
    type: String,
    required: true,
  },

  profilePicture: {
    type: String,
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
    type: String
  },

  interests: {
    type: [String],
    default: [],
    required: true
  },

  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },

  socialLinks: {
    type: [String],
    default: []
  },

  token: {
    type: String,
    required: true
  },
};

const User = mongoose.model('User', userSchema);

module.exports = User;
