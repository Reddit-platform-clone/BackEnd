

const Post = require('../models/postModel.js');

const subredditService = {
    getBest: async () => {
        // Logic to get best post
        try {
            // Fetch posts from the database
            const posts = await Post.find();

            // Sort posts based on upvotes
            posts.sort((a, b) => {
                return b.upvotes - a.upvotes;
            });
            return posts[0];
        } catch(error) {
            console.error('Error fetching best post:', error);
            throw new Error('Failed to fetch best post');
        }
        // return best post
    },

    getHot: async (post) => {
        // Logic to get hot post

        // return hot post
    },

    getNew: async (post) => {
        // Logic to get new post

        // return new post
    },

    getTop: async (post) => {
        // Logic to get top post

        // return top post
    },

    getRandom: async (post) => {
        // Logic to get random post

        // return random post
    }
};

module.exports = subredditService;