

const userController = {
    

    blockUser: async (req, res) => {
        
            
            res.json({ success: true, message: 'User blocked successfully' });
        
            res.status(500).json({ success: false, message: 'Failed to block user', error: error.message });
        
    }
};

module.exports = userController;
