
const createPostService = require('../services/createPostService');



const createPostController = {
    create: async (req, res) => {
        try {
            res.json({ success: true, message: 'post created successfully' });
        } 
        catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
       
    },
};

module.exports = createPostController;
