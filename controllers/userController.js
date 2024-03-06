
const userService = require('../services/userService');

const userController = {
    removeFriend: async (req, res) => {
        res.json({ message: 'friend removed' })
    }
};

module.exports = userController