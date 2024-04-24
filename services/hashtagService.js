const hashtag = require('../models/hashtagModel');

const hashtagService = {
    create: async (hashtagString) => {
        try {
            
            const newHashtag = new hashtag(hashtagString);

            const savedHashtag = await newHashtag.save();

           
            return savedHashtag;
        } catch (error) {
            console.error("Error creating hashtag:", error);
            throw new Error("Failed to create hashtag");
        }
    }
};

module.exports = hashtagService;
