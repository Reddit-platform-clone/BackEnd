const sort = require('../models/searchByModel.js');
const Post = require('../models/postModel.js');
const User = require('../models/userModel.js');
const Comment = require('../models/commentModel.js');
const Community = require('../models/communityModel.js');
const Hashtag = require('../models/hashtagModel.js');


const searchByService = {
    searchByUsers: async (keyword) => {
        try {
            // Search for users by username or displayName
            const usersResults = await User.find({
                $or: [
                    { username: { $regex: keyword, $options: 'i' } },
                    { displayName: { $regex: keyword, $options: 'i' } }
                ]
            });
            return usersResults;
        } catch (error) {
            console.error("Error searching by users:", error);
            throw new Error("Failed to search for users");
        }
    },
    
    searchByPosts: async (keyword) => {
        try {
            // Perform text search on the 'content' and 'title' fields
            const postsResults = await Post.find(
                { $text: { $search: keyword } }, // Search for the keyword
                { score: { $meta: "textScore" } } // Sort by relevance score
            ).sort({ score: { $meta: "textScore" } }); // Sort results by relevance score
            return postsResults;
        } catch (error) {
            console.error("Error searching by posts:", error);
            throw new Error("Failed to search for posts");
        }
    },
    
    searchByComments: async (keyword) => {
        try {
            // Search for comments by content
            const commentsResults = await Comment.find(
                { $text: { $search: keyword } }, // Search for the keyword
                { score: { $meta: "textScore" } } // Sort by relevance score
            ).sort({ score: { $meta: "textScore" } });
            return commentsResults;
        } catch (error) {
            console.error("Error searching by comments:", error);
            throw new Error("Failed to search for comments");
        }
    },

    searchByCommunities: async (keyword) => {
        try {
            // Search for communities by name or description
            const communitiesResults = await Community.find({
                $or: [
                    { communityID: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                    { communityName: { $regex: keyword, $options: 'i' } },
                ]
            });
            return communitiesResults;
        } catch (error) {
            console.error("Error searching by communities:", error);
            throw new Error("Failed to search for communities");
        }
    },

    searchByHashtags: async (keyword) => {
        try {
            // Search for hashtags by name
            const hashtagsResults = await Hashtag.find({
                hashtagString: { $regex: keyword, $options: 'i' }
            });
            return hashtagsResults;
        } catch (error) {
            console.error("Error searching by hashtags:", error);
            throw new Error("Failed to search for hashtags");
        }
    }
};

module.exports = searchByService;
