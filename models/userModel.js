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
  },

  savedPosts: [String],
  upVotes: [String],
  downVotes: [String],
  followPosts:[String],
  hidePosts:[String],
  savedCategories:[String],

  resetPasswordToken: String,
  resetPasswordTokenExpires: Date
};

const User = mongoose.model('User', userSchema);

module.exports = User;
