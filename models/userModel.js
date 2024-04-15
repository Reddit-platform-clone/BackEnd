const mongoose = require('mongoose');

const userSchema = {
  username: {
    type: String,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true
  },

  dateOfBirth: {
    type: String
  },

  displayName: {
    type: String,
  },

  profilePicture: {
    type: String,
    default: 'soora gamda fashkh'
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
    default: 'user gamed mot'
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
  },

  savedPosts: {
    type: [String],
    default: []
  },

  upVotes: {
    type: [String],
    default: []
  },

  downVotes: {
    type: [String],
    default: []
  },

  resetPasswordToken: String,
  resetPasswordTokenExpires: Date
};

const User = mongoose.model('User', userSchema);

module.exports = User;
