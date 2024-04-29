

const Post = require('../models/postModel.js');
const enrichPostsWithExtras  = require('./modifierPostService.js');

const subredditService = {
    getAll: async () => {
        try {
            const post = await Post.find();
            return post;
        } catch (error) {
            console.log('Error fetching posts:', error);
            throw new Error('Failed to fetch post');
        }
    },

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
            const postIds = posts.map(post => post._id);
            console.log(postIds)
            let postWithExtraAttributes=await enrichPostsWithExtras(['662a7d802f17a91f4cdfae51']);
            console.log(postWithExtraAttributes)
            // Sort posts based on score criteria
            postWithExtraAttributes.sort((a, b) => {
                const scoreA = a.upvotes + a.numComments - Math.floor((Date.now() - a.createdAt) / (1000 * 60 * 60 * 24));
                const scoreB = b.upvotes + b.numComments - Math.floor((Date.now() - b.createdAt) / (1000 * 60 * 60 * 24));
                return scoreB - scoreA;
            });

            return postWithExtraAttributes;
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

            posts.sort((a,b) => b.createdAt - a.createdAt);

            return posts;
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
                const scoreA = a.upvotes + a.numComments;
                const scoreB = b.upvotes + b.numComments;
                return scoreB - scoreA;
            });

            return posts;
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