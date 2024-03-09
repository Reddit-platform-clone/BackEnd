const hideController = {

  hideLink: async (req, res) => {
    try {
      res.json({ success: true, message: 'Link linkId hidden successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to hide link', error: error.message });
    }
  },
};

module.exports = hideController;
