const sort = require('../models/searchByModel.js');
const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const Comment = require('../models/commentModel.js');
const Community = require('../models/communityModel.js');
const Hashtag = require('../models/hashtagModel.js');


const searchByService = {
    searchByUsers: async (userId) => {
        // Logic to search by users
        const usersResults = await User.findById(userId);
        return usersResults;
    },
    
    searchByPosts: async (post) => {
        // Logic to search by posts
        let postsResults = await Post.find(post);
        //Logic for Trending today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        postsResults = postsResults.filter(post => post.createdAt >= today);
        //Logic for Sorting
        postsResults.sort((a, b) => b.createdAt - a.createdAt);
        // return posts results
        return postsResults;
    },
    
    searchByComments: async (commentId) => {
        // Logic to search by comments
        const commentsResults = await Comment.findById(commentId).sort({ createdAt: -1 });
        return commentsResults;
    },

    searchByCommunities: async (communityId) => {
        // Logic to search by communities
        const communitiesResults = await Community.findById(communityId);
        return communitiesResults;
    },

    searchByHashtags: async (hashtags) => {
        // Logic to search by hashtags
        const hashtagsResults = await Hashtag.find({ name: { $in: hashtags } });
        return hashtagsResults;

    }
};

module.exports = searchByService;