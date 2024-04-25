const Post = require('../models/postModel');
const User = require('../models/userModel');
const Community = require('../models/communityModel.js')
const { v4: uuidv4 } = require('uuid'); // Import the uuid library

const createPostService = {
    createPost: async (postData,username) => {
        try {
            console.log(postData)
            if(!postData.title || !postData.communityId){
                return { success: false, error: `title or communityId is null.` };
            }


            const community = await Community.findOne({_id:postData.communityId })
           if(!community)
           { 
            return { success: false, error: `community is not exists.` };
        }
        postData.username=username
        const newPost = new Post(postData);
        const savedPost = await newPost.save();

        community.posts.push(savedPost._id)
        await community.save()

            
            return { success: true, message: `Post created succesfully` };
        } catch (error) {
            console.error("Error creating post:", error);
            throw new Error("Failed to create post");
        }
    }
};

module.exports = createPostService;
