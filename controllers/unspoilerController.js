const unspoilerController = {
    markAsUnspoiler: async (req, res) => {
      try {
        const { id } = req.body;
        const message = ` ID ${id} marked as unspoiler and hidden successfully`;
  
        res.json({ success: true, message });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to mark link as unspoiler and hide it', error: error.message });
      }
    },
  };
  
  module.exports = unspoilerController;
  