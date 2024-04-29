const hashtagService = require('../services/hashtagService.js'); 

const hashtagController = {
    create: async (req, res) => {
        try {
            // Extract string from the request body
            const hashtagString = req.body;

            
            const newHashtag = await hashtagService.create(hashtagString); // Pass userId as an argument

            // Return the newly created post in the response
            return res.status(201).json(newHashtag);
        } catch (error) {
            console.error("Error creating Hashtag:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = hashtagController;
