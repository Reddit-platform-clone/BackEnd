const user = require('../models/userModel.js');

const userService = {
  logIn: async (username) => {
    // logic to login registered users
  },

  singUp: async (credentials) => {
    // logic to register new users
  },

  logInForgetPassword: async (username) => {
    // logic to reset password
  },

  logInForgetUsername: async (email) => {
    // logic to reset username
  },

  verifyEmail: async (email) => {
    // logic to verify email
  },

  resetPassword: async (password) => {
    // logic to reset password
  },

  removeFriend: async (username) => {
    // logic to remove friend
  },

  reportUser: async (username) => {
    // logic to report a user
  },

  blockUser: async (username) => {
    // logic to report a user
  },

  createRelationship: async (username) => {
    // logic to create relationships
  },

  removeRelationship: async (username) => {
    // logic to create relationships
  },

  getFriendInfo: async (username) => {
    // logic to get user info
  },

  checkUsernameAvailability: async (username) => {
    // logic to check username validity
  },
};

module.exports = userService;
