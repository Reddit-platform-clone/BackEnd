const userService = require('../services/userService');

const userController = {
  logIn: async (req, res) => {
    try {
      try {
        const { username, password } = req.body;
        if (!username || !password) {
          res.status(400).send('missing username or password');
          return;
        }

        const result = await userService.logIn(username, password);
        res.status(200).json(result);
      } catch (error) {
        res.status(401).send(error.message)
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  singUp: async (req, res) => {
    try {
      try {
        const { username, password } = req.body;
        if (!username || !password) {
          res.status(400).send('missing username or password');
          return;
        }
        const result = await userService.singUp(username, password);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).send(error.message)
      }
    } catch (err) {
      res.status(500).send(err.message)
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
    res.json({ message: 'friend removed' });
  },

  reportUser: async (req, res) => {
    res.json({ message: 'report sent' });
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
    res.json({ message: 'check username availability' })
  },

  getUserAbout: async (req, res) => {
    res.json({ message: 'user about'})
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

  getIdentity: async (req, res) => {
    res.json({ message: 'user identity'})
  },

  getPreferences: async (req, res) => {
    res.json({ message: 'user preferences'})
  }
};

module.exports = userController;
