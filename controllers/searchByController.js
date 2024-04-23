const searchByService = require('../services/searchByServices.js'); 

const searchByController = {
    users: async (req, res) => {
        try {
            const keyword = req.body.keyword;
            if (!keyword) {
                return res.status(400).json({ error: "Keyword is required to search users" });
            }

            const usersResults = await searchByService.searchByUsers(keyword);

            return res.status(200).json(usersResults);
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

            return res.status(200).json(postsResults);
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

            return res.status(200).json(commentsResults);
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

            return res.status(200).json(communitiesResults);
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

            return res.status(200).json(hashtagsResults);
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

            return res.status(200).json(allResults);
        } catch (error) {
            console.error("Error searching All:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = searchByController;
