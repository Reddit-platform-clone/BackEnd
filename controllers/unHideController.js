const unhideController = {
  unhideLink: async (req, res) => {
    try {
      const { id } = req.body;
      const message = `Link with ID ${id} has been successfully unhidden`;
      res.json({ success: true, message });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to unhide link', error: error.message });
    }
  },
};

module.exports = unhideController;
