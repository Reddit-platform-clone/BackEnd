

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
            return posts;
        } catch(error) {
            console.error('Error fetching best post:', error);
            throw new Error('Failed to fetch best post');
        }
    },

    getHot: async () => {
        // Logic to get hot post
        try {
            // Fetch posts from the database
            const posts = await Post.find();

            // Sort posts based on score criteria
            posts.sort((a, b) => {
                const scoreA = a.upvotes + a.num_comments - Math.floor((Date.now() - a.date_time) / (1000 * 60 * 60 * 24));
                const scoreB = b.upvotes + b.num_comments - Math.floor((Date.now() - b.date_time) / (1000 * 60 * 60 * 24));
                return scoreB - scoreA;
            });

            return posts[0];
        } catch (error) {
            console.error('Error fetching hot post:', error);
            throw new Error('Failed to fetch hot post');
        }
    },

    getNew: async () => {
        // Logic to get new post
        try {
            // Fetch posts from the database
            const posts = await Post.find();

            posts.sort((a,b) => b.date_time - a.date_time);

            return posts[0];
        } catch (error) {
            console.error('Error fetching new posts:', error);
            throw new Error('Failed to fetch new posts');
        }
    },

    getTop: async () => {
        // Logic to get top post
        try {
            // Fetch posts from the database
            const posts = await Post.find();

            // Sort posts based on score criteria
            posts.sort((a, b) => {
                const scoreA = a.upvotes + a.num_comments;
                const scoreB = b.upvotes + b.num_comments;
                return scoreB - scoreA;
            });

            return posts[0];
        } catch (error) {
            console.error('Error fetching hot post:', error);
            throw new Error('Failed to fetch hot post');
        }
    },

    getRandom: async () => {
        // Logic to get random post
        try {
            // Fetch posts from the database
            const posts = await Post.find();

            // Generate a random index within the range of the posts array
            const randomIndex = Math.floor(Math.random() * posts.length);

            return posts[parseInt(randomIndex)];
        } catch (error) {
            console.error('Error fetching random post:', error);
            throw new Error('Failed to fetch random post');
        }
    }
};

module.exports = subredditService;