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

  profileBanner: String,

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

  gender: String,

  socialLinks: {
    type: [String],
    default: []
  },

  displayPic: {
    type: String
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
  followPosts:{
    type: [String],
    default: []
  },
  hidePosts:{
    type: [String],
    default: []
  },
  savedCategories:{
    type: [String],
    default: []
  },
  joinedCommunities: {
    type: [String],
    default: []
  }, 

  mutedCommunities: {
    type: [String],
    default: []
  },

  resetPasswordToken: String,
  resetPasswordTokenExpires: Date
};

const User = mongoose.model('User', userSchema);

module.exports = User;
