require('dotenv').config();

const userModel = require('../models/userModel.js');
const utils = require('../utils/helpers.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = {
  logIn: async (username, password) => {
    // logic to login registered users
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('invalid username or password'); 

    // const isValid = await bcrypt.compare(password, user.password);
    const isValid = await utils.validatePassword(password, user.password);
    if (!isValid) throw new Error('invalid username or password');

    const token = jwt.sign(user.username, process.env.SECRET_ACCESS_TOKEN);

    return { token: token };
  },

  singUp: async (username, password) => {
    // logic to register new users
    const userExists = await userModel.findOne({ username: username });
    if (userExists) throw new Error('User already exists');

    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = await utils.hashPassword(password);
    const userData = { username: username, password: hashedPassword };

    const token = jwt.sign(userData.username, process.env.SECRET_ACCESS_TOKEN);

    const user = new userModel(userData);

    await user.save();
    return { token: token };
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

  removeFriend: async (username, usernameToRemove) => {
    // logic to remove friend
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User does not exist');

    const friendIndex = await user.friends.indexOf(usernameToRemove);
    if (friendIndex === -1) throw new Error('User is not a friend');

    user.friends.splice(friendIndex, 1);
    await user.save();

    return { message: 'Friend removed successfully' };
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

  getUserAbout: async (username) => {
    // logic to get user details
  },

  getUserOverview: async (username) => {
    // logic to get user details
  },

  getUserSubmitted: async (username) => {
    // logic to get user details
  },

  getUserComments: async (username) => {
    // logic to get user details
  },

  getUserUpvoted: async (username) => {
    // logic to get user details
  },

  getUserDownvoted: async (username) => {
    // logic to get user details
  },
  
  getIdentity: async () => {
    // logic to get user identity
  },

  getPreferences: async () => {
    // logic to get user preferences
  }
};

module.exports = userService;
