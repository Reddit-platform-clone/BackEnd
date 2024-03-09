const sendRepliesController = {
  toggleInboxReplies: async (req, res) => {
    try {
      const { state } = req.body;
      const message = state ? 'Inbox replies enabled' : 'Inbox replies disabled';

      res.json({ success: true, message });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to toggle inbox replies', error: error.message });
    }
  },
};

module.exports = sendRepliesController;
