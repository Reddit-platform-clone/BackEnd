const userService = require('../services/userService');
const utils = require('../utils/helpers.js');
const mail = require('../utils/mailHandler.js');

const userController = {
  logIn: async (req, res) => {
    try {
      try {
        const { emailOrUsername, password } = req.body;
        if (!emailOrUsername || !password) {
          res.status(400).send('missing username or password');
          return;
        }
        const result = await userService.logIn(emailOrUsername, password);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  singUp: async (req, res) => {
    try {
      try {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
          res.status(400).send('missing username or email or password');
          return;
        }

        if (!utils.isValidEmail(email)){
          res.status(400).send('please enter a valid email');
          return;
        }

        const result = await userService.singUp(username, email, password);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  verifyToken: async (req, res) => {
    try {
      const token = req.body.token;
      const result = await userService.verifyToken(token);

      res.status(200).json(result);
    } catch(err) {
      res.status(400).send({ message: err.message });
    }
  },

  logInForgetPassword: async (req, res) => {
    try {
      const emailOrUsername = req.body.emailOrUsername;
      const userData = await userService.logInForgetPassword(emailOrUsername);
      const resetUrl = `http://localhost:3000/login/reset_password/${userData.resetToken}`;
      const emailHTML = `Click <a href=${resetUrl}>here</a> to reset your password, this link is valid for a short period of time, if you didn't request changing your password ignore this email`;
      const emailSubject = 'Reset Password';
      
      await mail({
          email: userData.email,
          subject: emailSubject,
          text: emailHTML
        })      
        
        res.status(200).json({ status: 'success', message: 'reset email sent' });
    } catch(err) {

      res.status(400).json({ message: err.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const password = req.body.password;
      const token = req.params.token;

      const result = await userService.resetPassword(token, password);

      res.status(200).json(result);
    } catch(err) {
      res.status(400).json({ message: err.message });
    }
  },

  logInForgetUsername: async (req, res) => {
    try {
      const email = req.body.email;
      const userData = await userService.logInForgetUsername(email);
      const resetUrl = `http://localhost:3000/login/reset_username/${userData.resetToken}`;
      const emailHTML = `Click <a href=${resetUrl}>here</a> to reset your username, this link is valid for a short period of time, if you didn't request changing your username ignore this email`;
      const emailSubject = 'Reset Username';
      
      await mail({
          email: userData.email,
          subject: emailSubject,
          text: emailHTML
        })      
        
        res.status(200).json({ status: 'success', message: 'reset email sent' });
    } catch(err) {

      res.status(400).json({ message: err.message });
    }
  },

  resetUsername: async (req, res) => {
    try {
      const username = req.body.username;
      const token = req.params.token;

      const result = await userService.resetUsername(token, username);

      res.status(200).json(result);
    } catch(err) {
      res.status(400).json({ message: err.message });
    }
  },

  removeFriend: async (req, res) => {
    try {
      try {
        const username = req.user.username;
        const usernameToRemove = req.params.username;
        const result = await userService.removeFriend(username, usernameToRemove);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  reportUser: async (req, res) => {
    try {
      try {
        const { reported, details } = req.body;
        const reporter = req.user.username;
        const result = await userService.reportUser(reporter, reported, details);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } catch (err) { 
      res.status(500).json({ message: err.message });
    }
  },

  blockUser: async (req, res) => {
    try {
      try {
        const { usernameToBlock } = req.body;
        if (!usernameToBlock) { 
          res.status(400).send('missing username to block'); 
          return; 
        }
        const username = req.user.username;
        const result = await userService.blockUser(username, usernameToBlock);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createRelationship: async (req, res) => {
    res.json({ message: 'relationship created' });
  },

  removeRelationship: async (req, res) => {
    res.json({ message: 'relationsship removed' });
  },

  getFriendInfo: async (req, res) => {
    try {
      try {
        const friendUsername = req.params.username;
        const username = req.user.username;
        const result = await userService.getFriendInfo(username, friendUsername);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  checkUsernameAvailability: async (req, res) => {
    try {
      const { username } = req.params; // Assuming username is in the URL params
      const result = await userService.checkUsernameAvailability(username);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getUserAbout: async (req, res) => {
    try {
      try {
        const username = req.params.username;
        const result = await userService.getUserAbout(username);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
  getUserOverview: async (req, res) => {
    try {
      const username = req.params.username;
      const result = await userService.getUserOverview(username);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  
  getUserSubmitted: async (req, res) => {
    try {
      const username = req.params.username;
      const result = await userService.getUserSubmitted(username);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  
  getUserComments: async (req, res) => {
    try {
      const username = req.params.username;
      const result = await userService.getUserComments(username);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  
  getUserUpvoted: async (req, res) => {
    try {
      const usernameToView = req.params.username;
      const user = req.user.username;
      if (usernameToView != user) {
        res.status(403).json({ message: 'you have no access to this page' });
        return;
      }

      const result = await userService.getUserUpvoted(usernameToView);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  
  getUserDownvoted: async (req, res) => {
    try {
      const usernameToView = req.params.username;
      const user = req.user.username;
      if (usernameToView != user) {
        res.status(403).json({ message: 'you have no access to this page' });
        return;
      }

      const result = await userService.getUserDownvoted(usernameToView);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  getUserIdentity: async (req, res) => {
    try {
      const username = req.user.username;

      const result = await userService.getUserIdentity(username);

      res.status(200).json(result);
    } catch(err) {
      res.status(400).json({ message: err.message });
    }
  },

  getPrefs: async (req, res) => {
    try {
      const username = req.user.username;
  
      const result = await userService.getPrefs(username);
  
      res.status(200).json(result);
    } catch(err) {
      res.status(400).json({ message: err.message });
    }
  },

  updatePrefs: async (req, res) => {
    try {
      const username = req.user.username;
      const settings = req.body;

      const result = await userService.updatePrefs(username, settings);
  
      res.status(200).json(result);
    } catch(err) {
      res.status(400).json({ message: err.message });
    }
  },

  savePost: async (req, res) => {
    try {
      const username = req.user.username;
      const postId = req.body.postId;

      const result = await userService.savePost(username, postId);
      res.status(200).json({message : result});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  },

  unSavePost: async (req, res) => {
    try {
      const username = req.user.username;
      const postId = req.body.postId;

      const result = await userService.unsavePost(username, postId);
      res.status(200).json({message: result})
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  },

  viewPost: async (req, res) => {
    try {
      const username = req.params.username;
      const postId = req.body.postId;

      const result = await userService.viewPost(username, postId);
      res.status(200).json({message : result});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  },

  getRecentlyViewedPosts: async (req, res) => {
    try {
      let username =req.params.username;
      const result = await userService.getRecentlyViewedPosts(username);
      res.status(200).json({message : result});
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  },

  deleteUser: async (req, res) => {
    try {
      const username = req.user.username;
      const result = await userService.deleteUser(username);

      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  upvotedPostsIds: async (req, res) => {
    try {
      const username = req.user.username;
      const result = await userService.getUpvotedIds(username);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  downvotedPostsIds: async (req, res) => {
    try {
      const username = req.user.username;
      const result = await userService.getDownvotedIds(username);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

module.exports = userController;
