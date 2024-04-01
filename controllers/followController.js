const followController = {

  followPost: async (req, res) => {
    try {
      res.json({ success: true, message: 'You are now following post 2' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to follow post', error: error.message });
    }
  },
};

module.exports = followController;
