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
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User does not exist');
    
    const friendName = user.friends.find(friend => friend === friendUsername);
    if (!friendName) throw new Error('User is not a friend');
    
    const friend = await userModel.findOne({ username: friendUsername });
    return { 
      username: friend.username, 
      interests: friend.interests, 
      socialLinks: friend.socialLinks, 
      dateOfBirth: friend.dateOfBirth, 
      profilePicture: friend.profilePicture, 
      about: friend.about 
    };    
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
