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
            
            if(!postData.title || !postData.communityId){
                return { success: false, error: `title or communityId is null.` };
            }


            const community = await Community.findOne({communityName:postData.communityId })
           if(!community)
           { 
            return { success: false, error: `community is not exists.` };
        }
        postData.username=username
        const newPost = new Post(postData);
        const savedPost = await newPost.save();

        try {
            const modqueueItem = { communityName: postData.communityId, entityId: savedPost._id, type: 'post', username: username, modStatus: 'unmoderated' };
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

        pushNotificationService.sendPushNotificationToToken('cLS-T5z6R3Kmn6F8AUnQc0:APA91bEJKlXeGRM8fcrCWyZ97gEieQLf_j2IPnKkzR_mIpelP_jAbIr53_CeH3UeaH7MtaWkR4zcIsi0YrkUd7TfADeIxqJPsNqRm4XDAeWwuO6iibCJF-3ktXUSCawuix-BodQlGF3j', 'Test', 'Joe trying notifications');
        console.log('Notification sent');    

        return { success: true, message: `Post created succesfully` };
        } catch (error) {
            console.error("Error creating post:", error);
            throw new Error("Failed to create post");
        }
    }
};

module.exports = createPostService;
