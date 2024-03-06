const editController = {
  

    editUserText: async (req, res) => {
        
        try {
       
            res.json({ success: true, message: `Body text of post ${postId} edited successfully`, newText: newText });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to edit body text', error: error.message });
        }
    }
};

module.exports = editController;
