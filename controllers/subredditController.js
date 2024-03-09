
const subredditService = require('../services/subredditService.js');

const subredditController = {
    getBestPost: async (req, res) => {
        try {
            // Placeholder post
            const bestPost = [
                {
                    postId: '1',
                    postContent: 'Best post',
                    createdAt: new Date()
                },
                {
                    postId: '2',
                    postContent: 'Second Best post',
                    createdAt: new Date()
                }             
            ];
            res.json({ succes: true, date: bestPost });
        } catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
    },

    getHotPost: async (req, res) => {
        try {
            // Placeholder post
            const hotPost = [
                {
                    postId: '1',
                    postContent: 'Hot post',
                    createdAt: new Date()
                },
                {
                    postId: '2',
                    postContent: 'Second Hot post',
                    createdAt: new Date()
                }             
            ];
            res.json({ succes: true, date: hotPost });
        } catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
    },

    getNewPost: async (req, res) => {
        try {
            // Placeholder post
            const newPost = [
                {
                    postId: '1',
                    postContent: 'New post',
                    createdAt: new Date()
                },
                {
                    postId: '2',
                    postContent: 'Second New post',
                    createdAt: new Date()
                }             
            ];
            res.json({ succes: true, date: newPost });
        } catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
    },

    getTopPost: async (req, res) => {
        try {
            // Placeholder post
            const topPost = [
                {
                    postId: '1',
                    postContent: 'Top post',
                    createdAt: new Date()
                },
                {
                    postId: '2',
                    postContent: 'Second Top post',
                    createdAt: new Date()
                }             
            ];
            res.json({ succes: true, date: topPost });
        } catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
    },

    getRandomPost: async (req, res) => {
        try {
            // Placeholder post
            const randomPost = [
                {
                    postId: '1',
                    postContent: 'Random post',
                    createdAt: new Date()
                },
                {
                    postId: '2',
                    postContent: 'Second Random post',
                    createdAt: new Date()
                }             
            ];
            res.json({ succes: true, date: randomPost });
        } catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
    },
};

module.exports = subredditController;