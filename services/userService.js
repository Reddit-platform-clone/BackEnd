require('dotenv').config();

const mongoose = require('mongoose')
const userModel = require('../models/userModel.js');
const reportModel = require('../models/profileReportModel.js');
const settingsModel = require('../models/settingsMode.js');
const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel.js');
const voteModel = require('../models/voteModel.js')
const utils = require('../utils/helpers.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Communities = require('../models/communityModel.js');
const { foreign_key } = require('i/lib/methods.js');
const enrichPostsWithExtras  = require('./modifierPostService.js');
const Vote = require('../models/voteModel'); 
const Post = require('../models/postModel.js');

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

singUp: async (username, email, password, profilePictureUpload) => {
  // logic to register new users
    const userExists = await userModel.findOne({ username: username });
    if (userExists) throw new Error('Username already taken');

    const emailExists = await userModel.findOne({ email: email });
    if (emailExists) throw new Error ('this email is already linked to an account')

    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = await utils.hashPassword(password);
    const userData = { username: username, password: hashedPassword, email: email, profilePicture: profilePictureUpload };

    const token = jwt.sign({ username: userData.username }, process.env.SECRET_ACCESS_TOKEN);

    const user = new userModel(userData);

    await user.save();
    return { token: token };
  },

  updatePic: async (username, profilePic) => {
    try {
      const userExists = await userModel.findOne({username: username})
      if (!userExists) {
        throw new Error("User doesn't exist");
      }

      userExists.profilePicture = profilePic;
      await userExists.save()
      
      return {success: true, message: "Profile picture updated successfully"}
    } catch (error) {
      return {success: false, message: error.message}
    }
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

      const settings = { signedInWithGoogle: true };
      await settingsModel.findOneAndUpdate({ username: username }, settings, { upsert: true })
      
      return { token: userToken };
    } catch (err) {
      throw new Error(err.message)
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

  logInForgetUsername: async (email) => {
    // logic to reset username
    let userEmail;
    if (utils.isValidEmail(email)){
      user = await userModel.findOne({ email: email });
      if (!user) throw new Error('invalid email'); 

      userEmail = email;
    };

    const resetToken = crypto.randomBytes(64).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    return { email: userEmail, resetToken: resetToken }
  },

  resetUsername: async (token, username) => {
    // logic to reset username
    const user = await userModel.findOne({ resetPasswordToken: token });
    if (!user) throw new Error('User not found')

    if(Date.now() > user.resetPasswordTokenExpires){
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpires = undefined;
      await user.save();
      throw new Error('link expired')
    }

    const newUsername = username;
    user.username = newUsername;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save();

    return { message: 'username updated' }
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

  unblockUser: async (username, usernameToUnblock) => {
    // logic to unblock user
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User does not exist');

    if(!user.blockedUsers.includes(usernameToUnblock)) throw new Error('User is not blocked');
    user.blockedUsers.pull(usernameToUnblock)
    await user.save();
    return { message: 'User unblocked successfully' };
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
    if (user) return { message: 'Username is not available' };
    return { message: 'Username is available' };
  },

  getUserAbout: async (username) => {
    // logic to get user details
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User does not exist');

    return { about: user.about }
  },

  getUserOverview: async (username) => {
    // logic to get user details
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User does not exist');
    const following  = await userModel.find({ followers: username }, 'username -_id');
    return{ 
      username: user.username,
      profilePicture: user.profilePicture,
      follwers: user.followers,
      following: following,
      about: user.about,
      gender: user.gender,
      links: user.socialLinks,
      communitiesJoined: user.joinedCommunities
    };
  },

  getUserSubmitted: async (username) => {
    // logic to get user details
    const user = await userModel({ username: username })
    if (!user) throw new Error('User does not exist')

    const userPosts = await postModel.aggregate([
      { $match: { username: username } },
      { $lookup: {
        from: commentModel.collection.name,
        localField: "_id",
        foreignField: "postID",
        as: "comments"
      } },
      { $project: 
        {
          content: 1,
          title: 1,
          username: 1,
          media: 1,
          downvotes: 1,
          communityId: 1,
          upvotes: 1,
          scheduled: 1,
          isSpoiler: 1,
          isLocked: 1,
          isReported: 1,
          isReason: 1,
          nsfw: 1,
          ac: 1,
          url: 1,
          flair: 1,
          commentCount: { $size: "$comments" }
        }
      
      }
    ])
    return { posts: userPosts };
  },

  getUserComments: async (username) => {
    // logic to get user 
    const user = await userModel({ username: username })
    if (!user) throw new Error('User does not exist')

    const userComments = await commentModel.find({ userID: username });
    if (!userComments) return { message: 'user has no comments' };

    return { userComments };
  },

  getUserUpvoted: async (username) => {
    // logic to get user details
    let returnedVote=[]
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User not found');
    let votes=await Vote.find({username:username, rank: 1});
    if(!votes || votes.length == 0 ){
      return {upvotes: []}
    }
    for (const vote of votes) {
      if (vote.type === 'post') {
        let check=await Post.findOne({_id:vote.entityId});
        if(!check){
          continue;
        }
        console.log(vote.entityId)
        let postmod=await enrichPostsWithExtras([vote.entityId]);
        console.log(postmod)
        returnedVote.push(["post", postmod])

      }
      else{
        if(! await commentModel.findOne({_id:vote.entityId})){
          continue;
        }
        returnedVote.push(["comment", vote])
      }
  }


    return { upvotes: returnedVote };
  },

  getUserDownvoted: async (username) => {
    // logic to get user details
    let returnedVote=[]
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User not found');
    let votes=await Vote.find({username:username, rank: -1});
    if(!votes || votes.length == 0 ){
      return {upvotes: []}
    }
    for (const vote of votes) {
      if (vote.type === 'post') {
        let check=await Post.findOne({_id:vote.entityId});
        if(!check){
          continue;
        }
        console.log(vote.entityId)
        let postmod=await enrichPostsWithExtras([vote.entityId]);
        console.log(postmod)
        returnedVote.push(["post", postmod])

      }
      else{
        if(! await commentModel.findOne({_id:vote.entityId})){
          continue;
        }
        returnedVote.push(["comment", vote])
        console.log(returnedVote)
      }
  }


    return { upvotes: returnedVote };
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
    userFields = ['email', 'password', 'gender', 'displayName', 'about', 'socialLinks', 'profilePicture', 'blockedUsers', 'mutedCommunities'];
    let profileSettings = {}
    for (let i in settings) {
      if (userFields.includes(i)) profileSettings[i] = settings[i];
    };

    
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error('User not found');
    
    if (profileSettings.hasOwnProperty('email')) settings.signedInWithGoogle = false;
    
    if (settings.hasOwnProperty('oldPassword')) {
      profileSettings.password = await utils.updatePassword(username, settings.oldPassword, settings.password)
      console.log(settings.oldPassword, settings.password)
    }
    
    if (!settings.hasOwnProperty('oldPassword') && settings.hasOwnProperty('password')) profileSettings.password = await utils.hashPassword(settings.password);

    const userSettings = await settingsModel.findOneAndUpdate({ username: username }, settings, { new: true, upsert: true, runValidators: true });
    const updatedProfile = await userModel.findOneAndUpdate({ username: username }, profileSettings, { new: true, upsert: true, runValidators: true });

    return { settings: userSettings, profile: updatedProfile };
  },

  savePost: async (username, postId) => {
    const user = await userModel.findOne({username: username});
    user.savedPosts.push(postId);
    user.save();
    
    return { message: 'Post saved successfully'};
  },

  unsavePost: async (username, postId) => {
    const user = await userModel.findOne({username: username});
    const postIndex = user.savedPosts.indexOf(postId);
    user.savedPosts.splice(postIndex,1);
    user.save();

    return { message: 'Post unsaved successfully'};
  },

  viewPost: async (username, postId) => {
    try {

      if(!username || !postId){
        return{success: false, message:'Enter username and postId'};
      }
      const user = await userModel.findOne({ username: username });
      const post = await postModel.findById(postId);

      if(!user){
        return{success: false, message:'user does not exist'};
      }

      if(!post){
        return{success: false, message:'post does not exist'};
      }

      const recentlyViewedPosts = user.recentlyViewedPosts;

      //if post is already present in recently viewed, return
      if(recentlyViewedPosts.includes(postId))
      {
        return{success: true, message:'post already in recently viewed'};
      }

      recentlyViewedPosts.push(postId);
    
      if (user.recentlyViewedPosts.length > 50) {
          // If exceeds, remove the oldest entry
          user.recentlyViewedPosts.shift();
      }
      await user.save();
      return { message: 'Post saved to recently viewed successfully' };
      } 
      catch (error) {
        console.error('Error viewing post:', error);
        throw new Error('Failed to save post to recently viewed');
      }
  },

  getRecentlyViewedPosts: async (Username) => {
    try {
        const user = await userModel.findOne({ username: Username });
        if (!user) {
          return{success: false, message: 'User not found'};
        }
        const postIds = user.recentlyViewedPosts;
        const posts = await postModel.find({ _id: { $in: postIds } });

        // Sort the posts based on their order in the recentlyViewedPosts array
        const result = postIds.map(postId => posts.find(post => post._id.toString() === postId));

        return {result};
    } catch (error) {
        console.error('Error retrieving recently viewed posts:', error);
        throw new Error('Failed to retrieve recently viewed posts');
    }
  },

  deleteRecentlyViewedPosts: async (Username) => {
    try {
        const user = await userModel.findOne({ username: Username });
        if (!user) {
          return{success: false, message: 'User not found'};
        }
        //empty the recentlyViewedPosts array of this user
        await userModel.updateOne({ username: Username }, { $set: { recentlyViewedPosts: [] } });
        return {success:true, message: 'Recently viewed history has been deleted'};
    } catch (error) {
        console.error('Error deleting recently viewed posts:', error);
        throw new Error('Failed to delete recently viewed posts');
    }
  },

  deleteUser: async (username) => {
    const user = await userModel.findOneAndDelete({ username: username });
    if(!user) throw new Error('No user found');

    await Communities.updateMany(
      { $or: [{ members: username }, { moderatorsUsernames: username }] },
      { $pull: { members: username, moderatorsUsernames: username } }
    );

    await Post.updateMany(
      { username: username },
      { $set: { username: 'DELETED' } }
    );

    await commentModel.updateMany(
      { userID: username },
      { $set: { userID: 'DELETED' } }
    );

    return { message: 'User deleted successfully' };
  },

  getUpvotedIds: async (username) => {
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error ('User does not exist');

    const upvotedPostsIds = await Vote.find({ username: username, rank: 1, type: 'post' }, 'entityId -_id');
    return { upvotedPostsIds: upvotedPostsIds };    
  },

  getDownvotedIds: async (username) => {
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error ('User does not exist');

    const downvotedPostsIds = await Vote.find({ username: username, rank: -1, type: 'post' }, 'entityId -_id');
    return { downvotedPostsIds: downvotedPostsIds };    
  },

  getInvitations: async (username) => {
    const user = await userModel.findOne({ username: username });
    if (!user) throw new Error ('User does not exist');
    if (user.modInvitations.length === 0 && user.communityInvitations.length === 0) return { message: 'User has no invitations pending' };
    return { modInvitations: user.modInvitations, memberInvitations: user.communityInvitations };
  }
};

module.exports = userService;
