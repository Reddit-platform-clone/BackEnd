const userService = require('../services/userService');
const utils = require('../utils/helpers.js');

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
        res.status(400).send(error.message)
      }
    } catch (err) {
      res.status(500).send(err.message)
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
        res.status(400).send(error.message)
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  verifyToken: async (req, res) => {
    try {
      const token = req.body.token;
      const result = await userService.verifyToken(token)

      res.status(200).json(result);
    } catch(err) {
      res.status(400).send({ error: err.message });
    }
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
    try {
      try {
        const username = req.user.username;
        const usernameToRemove = req.params.username;
        const result = await userService.removeFriend(username, usernameToRemove);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).send(error.message)
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  reportUser: async (req, res) => {
    try {
      try {
        const { reported, details } = req.body;
        const reporter = req.user.username;
        console.log(reporter, reported);
        const result = await userService.reportUser(reporter, reported, details);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).send(error.message)
      }
    } catch (err) { 
      res.status(500).send(err.message)
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
        res.status(400).send(error.message)
      }
    } catch (err) {
      res.status(500).send(err.message)
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
        res.status(400).send(error.message)
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  checkUsernameAvailability: async (req, res) => {
    try {
      const { username } = req.params; // Assuming username is in the URL params
      const result = await userService.checkUsernameAvailability(username);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getUserAbout: async (req, res) => {
    try {
      try {
        const username = req.params.username;
        const result = await userService.getUserAbout(username);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).send(error.message)
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  
  getUserOverview: async (req, res) => {
    res.json({ message: 'user overview'})
  },
  
  getUserSubmitted: async (req, res) => {
    res.json({ message: 'user submitted'})
  },
  
  getUserComments: async (req, res) => {
    res.json({ message: 'user comments'})
  },
  
  getUserUpvoted: async (req, res) => {
    res.json({ message: 'user upvoted'})
  },
  
  getUserDownvoted: async (req, res) => {
    res.json({ message: 'user downvoted'})
  },

  getPrefs: async (req, res) => {
    try {
      const username = req.user.username;
  
      const result = await userService.getPrefs(username);
  
      res.status(200).json(result);
    } catch(err) {
      res.status(400).send(err.message);
    }
  },

  updatePrefs: async (req, res) => {
    try {
      const username = req.user.username;
      const settings = req.body;

      const result = await userService.updatePrefs(username, settings);
  
      res.status(200).json(result);
    } catch(err) {
      res.status(400).send(err.message)
    }
  }
};

module.exports = userController;
