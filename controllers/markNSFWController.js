const nsfwController = {
  // Other controller methods...

  markNsfwModPosts: async (req, res) => {
    try {
      const { linkId } = req.body;

      res.json({ success: true, message: `Link ${linkId} marked as NSFW successfully` });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to mark link as NSFW', error: error.message });
    }
  },
};

module.exports = nsfwController;
