const unlockController = {
    unlockItem: async (req, res) => {
        try {
            const { itemType, id } = req.body; 
            const itemTypeText = itemType === 'post' ? 'post' : 'comment';
            const message = `${itemTypeText} with ID ${id} has been successfully unlocked`; 
            
            res.json({ success: true, message: message });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to unlock item', error: error.message });
        }
    }
};

module.exports = unlockController;
