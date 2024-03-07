
const userService = require('../services/userService');

const userController = {
    removeFriend: async (req, res) => {
        res.json({ message: 'friend removed' })
    },

    reportUser: async (req, res) => {
        res.json({ message: 'report sent'})
    },

    blockUser: async (req, res) => {
        res.json({message: 'user blocked '})
    },

    createRelationship: async (req, res) => {
        res.json({ message: 'relationship created' })
    },

    removeRelationship: async (req, res) => {
        res.json({ message: 'relationsship removed' })
    }
};

module.exports = userController