const savedCategoriesController = {
  getSavedCategories: async (req, res) => {
    try {
      const savedCategories = ['Technology', 'Travel', 'Food'];
      res.json({ success: true, data: savedCategories });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve saved categories', error: error.message });
    }
  },
};

module.exports = savedCategoriesController;
