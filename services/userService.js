require('dotenv').config();

const userModel = require('../models/userModel.js');
const reportModel = require('../models/profileReportModel.js');
const settingsModel = require('../models/settingsMode.js');
const utils = require('../utils/helpers.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userService = {
  logIn: async (emailOrUsername, password) => {
    // logic to login registered users
    let user;
    if (utils.isValidEmail(emailOrUsername)){
      user = await userModel.findOne({ email: emailOrUsername });
      if (!user) throw new Error('invalid email'); 
    } else {
      user = await userModel.findOne({ username: emailOrUsername });
      if (!user) throw new Error('invalid username')
    }
  
  const isValid = await utils.validatePassword(password, user.password);
  if (!isValid) throw new Error('invalid email or password');
  
  const token = jwt.sign({ username: user.username }, process.env.SECRET_ACCESS_TOKEN);
  
  return { token: token };
},

singUp: async (username, email, password) => {
  // logic to register new users
    const userExists = await userModel.findOne({ username: username });
    if (userExists) throw new Error('invalid username or password');

    const emailExists = await userModel.findOne({ email: email });
    if (emailExists) throw new Error ('this email is already linked to an account')

    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = await utils.hashPassword(password);
    const userData = { username: username, password: hashedPassword, email: email };

    const token = jwt.sign({ username: userData.username }, process.env.SECRET_ACCESS_TOKEN);

    const user = new userModel(userData);

    await user.save();
    return { token: token };
  },

  verifyToken: async (token) => {
    try {
      userData = await utils.verifyGoogleToken(token);
      
      let user = await userModel.findOne({ email: userData.email});
      let userToken;
      if(user) {
        if (!user.password) {
          const pass = crypto.randomBytes(10).toString('Hex');
          const hashedPass = await utils.hashPassword(pass);
          user.password = hashedPass;
          await user.save();
        }
        userToken = jwt.sign({ username: user.username }, process.env.SECRET_ACCESS_TOKEN);
        return { token: userToken };
      }
      const username = utils.generateRandomUsername();
      const password = crypto.randomBytes(10).toString('Hex');
      const hashedPassword = await utils.hashPassword(password);
  
      const newEntry = { username: username, email: userData.email, password: hashedPassword };
  
      userToken = jwt.sign({ username: newEntry.username }, process.env.SECRET_ACCESS_TOKEN);
      const newUser = new userModel(newEntry);
      await newUser.save();
      
      return { token: userToken };
    } catch (err) {
      return (err.message)
    }
  },

  logInForgetPassword: async (emailOrUsername) => {
    // logic to reset password
    let user;
    let userEmail;
    if (utils.isValidEmail(emailOrUsername)){
      user = await userModel.findOne({ email: emailOrUsername });
      if (!user) throw new Error('invalid email'); 

      userEmail = emailOrUsername;
    } else {
      user = await userModel.findOne({ username: emailOrUsername });
      if (!user) throw new Error('invalid username')

      userEmail = user.email;
    }
    const resetToken = crypto.randomBytes(64).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    return { email: userEmail, resetToken: resetToken }
  },

  resetPassword: async (token, password) => {
    // logic to reset password
    const user = await userModel.findOne({ resetPasswordToken: token });
    if (!user) throw new Error('User not found')

    if(Date.now() > user.resetPasswordTokenExpires){
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpires = undefined;
      await user.save();
      throw new Error('link expired')
    }

    const hashedPassword = await utils.hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save();

    return { message: 'password updated' }
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

  reportUser: async (reporterUsername, reportedUsername, details) => {
    // logic to report a user
    const reporter = await userModel.findOne({ username: reporterUsername });
    const reported = await userModel.findOne({ username: reportedUsername });

    if (!reporter || !reported) throw new Error('User does not exist');

    const reportData = { reporterUsername: reporter.username, reportedUsername: reported.username, details: details };
    const report = new reportModel(reportData);
    report.reason.push(details);
    await report.save();
    return{ message: 'Report sent successfully', reportrter: reporter.username, reported: reported.username, details: details}
  },

  blockUser: async (username, usernameToBlock) => {
    // logic to report a user
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User does not exist');

    const userToBlock = await userModel.findOne({ username: usernameToBlock });
    if (!userToBlock) throw new Error('User to block does not exist');

    if (user.blockedUsers.includes(usernameToBlock)) throw new Error('User is already blocked');

    await user.blockedUsers.push(usernameToBlock);
    await user.save();
    return { message: 'User blocked successfully' };
  },

  createRelationship: async (username) => {
    // logic to create relationships
  },

  removeRelationship: async (username) => {
    // logic to create relationships
  },

  getFriendInfo: async (username, friendUsername) => {
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
    const user = await userModel.findOne({ username: username });
    if (user) throw new Error('Username is not available');
    return { message: 'Username is available' };
  },

  getUserAbout: async (username) => {
    // logic to get user details
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User does not exist');

    return { about: user.about}
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
  
  getUserIdentity: async (username) => {
    // logic to get user identity
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User not found');

    return { user };
  },

  getPrefs: async (username) => {
    // logic to get user identity
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User not found');

    const settings = await settingsModel.findOneAndUpdate({ username: username }, {}, { new: true, upsert: true });

    return { settings: settings };
  },

  updatePrefs: async (username, settings) => {
    // logic to get update preferences
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User not found');

    const userSettings = await settingsModel.findOneAndUpdate({ username: username }, settings, { new: true, upsert: true, runValidators: true });

    return { settings: userSettings };
  }
};

module.exports = userService;
