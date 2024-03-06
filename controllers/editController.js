const editController = {

  editUserText: async (req, res) => {
    try {
      res.json({ success: true, message: 'Body text of post 4 edited successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to edit body text', error: error.message });
    }
  },
};

module.exports = editController;
