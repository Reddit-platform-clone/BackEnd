const suggestedSortController = {
  setSuggestedSort: async (req, res) => {
    try {
      const { sortType } = req.body;
      const message = sortType ? `Suggested sort set to ${sortType}` : 'Default suggested sort cleared';
      res.json({ success: true, message });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to set suggested sort', error: error.message });
    }
  },
};

module.exports = suggestedSortController;
