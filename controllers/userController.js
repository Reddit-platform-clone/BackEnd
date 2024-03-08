const userService = require('../services/userService');

const userController = {
  logIn: async (req, res) => {
    res.json({ message: 'welcome back' });
  },

  singUp: async (req, res) => {
    res.json({ message: 'welcome to sarakel' });
  },

  logInForgetPassword: async (req, res) => {
    res.json({ message: 'enter username and email' });
  },

  logInForgetUsername: async (req, res) => {
    res.json({ message: 'enter email' });
  },

  verifyEmail: async (req, res) => {
    res.json({ message: 'username reset' })
  },

  resetPassword: async (req, res) => {
    res.json({ message: 'password reset' })
  },

  removeFriend: async (req, res) => {
    res.json({ message: 'friend removed' });
  },

  reportUser: async (req, res) => {
    res.json({ message: 'report sent' });
  },

  blockUser: async (req, res) => {
    res.json({ message: 'user blocked ' });
  },

  createRelationship: async (req, res) => {
    res.json({ message: 'relationship created' });
  },

  removeRelationship: async (req, res) => {
    res.json({ message: 'relationsship removed' });
  },

  getFriendInfo: async (req, res) => {
    res.json({ message: 'user info' })
  },

  checkUsernameAvailability: async (req, res) => {
    res.json({ message: 'check username availability' })
  },
};

module.exports = userController;
