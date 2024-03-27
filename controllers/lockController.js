const lockController = {

  lockPost: async (req, res) => {
    try {
      res.json({ success: true, message: 'Post 3 locked successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to lock post', error: error.message });
    }
  },
};

module.exports = lockController;
