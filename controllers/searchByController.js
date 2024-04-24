const searchByService = require('../services/searchByServices.js'); 

const searchByController = {
    users: async (req, res) => {
        try {
            const keyword = req.body.keyword;
            if (!keyword) {
                return res.status(400).json({ error: "Keyword is required to search users" });
            }

            const usersResults = await searchByService.searchByUsers(keyword);
            const userSuggestions = usersResults.slice(0, 10);

            return res.status(200).json({usersResults, userSuggestions});
        } catch (error) {
            console.error("Error searching by users:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    
    posts: async (req, res) => {
        try {
            const keyword = req.body.keyword;
            if (!keyword) {
                return res.status(400).json({ error: "Keyword is required to search posts" });
            }

            const postsResults = await searchByService.searchByPosts(keyword);
            const postSuggestions = postsResults.slice(0, 10);

            return res.status(200).json({postsResults, postSuggestions});
        } catch (error) {
            console.error("Error searching by posts:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    
    comments: async (req, res) => {
        try {
            const keyword = req.body.keyword;
            if (!keyword) {
                return res.status(400).json({ error: "Keyword is required to search comments" });
            }

            const commentsResults = await searchByService.searchByComments(keyword);
            const commentSuggestions = commentsResults.slice(0, 10);

            return res.status(200).json({commentsResults, commentSuggestions});
        } catch (error) {
            console.error("Error searching by comments:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    communities: async (req, res) => {
        try {
            const keyword = req.body.keyword;
            if (!keyword) {
                return res.status(400).json({ error: "Keyword is required to search communities" });
            }

            const communitiesResults = await searchByService.searchByCommunities(keyword);
            const communitiesSuggestions = communitiesResults.slice(0, 10);
        

            return res.status(200).json({communitiesResults, communitiesSuggestions});
        } catch (error) {
            console.error("Error searching by communities:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    hashtags: async (req, res) => {
        try {
            const keyword = req.body.keyword;
            if (!keyword) {
                return res.status(400).json({ error: "Keyword is required to search hashtags" });
            }

            const hashtagsResults = await searchByService.searchByHashtags(keyword);
            const hashtagSuggestions = hashtagsResults.slice(0, 10);

            return res.status(200).json({hashtagsResults,hashtagSuggestions});
        } catch (error) {
            console.error("Error searching by hashtags:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    all: async (req, res) => {
        try {
            const keyword = req.body.keyword;
            if (!keyword) {
                return res.status(400).json({ error: "Keyword is required to search hashtags" });
            }

            const allResults = await searchByService.searchByAll(keyword);
            const allSuggestions = allResults.slice(0, 10);

            return res.status(200).json({allResults, allSuggestions});
        } catch (error) {
            console.error("Error searching All:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = searchByController;
