
const hidePostService = require('../services/hidePostService');



const hidePostController = {
    hide: async (req, res) => {
        try {
        res.json({ success: true, message: 'Hidden successfully' });
        } 
        catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
       
    },
};

module.exports = hidePostController;
