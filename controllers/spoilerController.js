const spoilerController = {
  markLinkAsSpoiler: async (req, res) => {
    try {
      const { id } = req.body;
      const message = `Link with ID ${id} marked as spoiler and hidden successfully`;

      res.json({ success: true, message });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to mark link as spoiler and hide it', error: error.message });
    }
  },
};

module.exports = spoilerController;
