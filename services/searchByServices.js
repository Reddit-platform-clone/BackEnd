const sort = require('../models/searchByModel.js');

const searchByService = {
    searchByUsers: async (userId) => {
        // Logic to search by users
         
        // return users results;
    },
    
    searchByPosts: async (post) => {
        // Logic to search by posts
        //Logic for Trending today
        //Logic for Sorting
        // return posts results
    },
    
    searchByComments: async (commentId) => {
        // Logic to search by comments
        //Logic for sorting
        // return comments results;
    },

    searchByCommunities: async (communityId) => {
        // Logic to search by communities
    
        // return communities results;
    },

    searchByHashtags: async (hashtags) => {
        //logic to search by hashtags
        //return hashtags results
    }
};

module.exports = searchByService;