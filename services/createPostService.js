const Post = require('../models/postModel');
const User = require('../models/userModel');
const Community = require('../models/communityModel.js')
const { v4: uuidv4 } = require('uuid'); // Import the uuid library
const Mention=require('../models/mentionModel');
const modqueue = require('../models/modqueueModel.js');
const pushNotificationService = require('./notificationsService.js');

const createPostService = {
    createPost: async (postData,username) => {
        try {

            console.log(username)
            if(!postData.title || !postData.communityId){
                return { success: false, error: `title or communityId is null.` };
            }

            const community = await Community.findOne({communityName:postData.communityId })
           if(!community)
           { 
            return { success: false, error: `community does not exists.` };
        }

        const user = await User.findOne({username: username})
        console.log(user)
        postData.username = user.username
        const newPost = new Post(postData);
        const savedPost = await newPost.save();

        try {
            const modqueueItem = { communityName: postData.communityId, entityId: savedPost._id, type: 'post', username: user.username, modStatus: 'unmoderated' };
            const modqueueEntry = new modqueue(modqueueItem);
            await modqueueEntry.save();
        } catch (err) {
            console.log(err.message);
        }

        community.posts.push(savedPost._id)
        await community.save()
        if(postData.content){
            const mentionRegex = /@(\w+)/g;
        
            const mentions =postData.content.match(mentionRegex);
            const savedmention=[]
            if (mentions) {
                let mentiondata=mentions.map(mention => mention.substring(1));
                
                for (const checkUser of mentiondata){
                    const userChecker= await User.findOne({username:checkUser})
                    if (userChecker){
                        const mention = new Mention({ mentionedBy:username,mentioned:checkUser,type:"post",entityId:savedPost._id });
                        
                        mention.save();
                        savedmention.push(checkUser);
                        
                    }
                }
                if (savedmention.length === mentiondata.length) {
                    return { success: true, message: 'post sent successfully with mentions.' };
                }
                else{
                    return { success: true, message: 'post sent successfully but some mentioned users do not exist',missingUsers: mentiondata.filter(username => !savedmention.includes(username)) };
                }
                
            }
    

        }

        pushNotificationService.sendPushNotificationToToken(user.deviceToken, 'Sarakel', 'New post created successfully');
        console.log('Notification sent');    

        return { success: true, message: `Post created succesfully` };
        } catch (error) {
            console.error("Error creating post:", error);
            throw new Error("Failed to create post");
        }
    }
};

module.exports = createPostService;
