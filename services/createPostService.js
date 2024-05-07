const Post = require('../models/postModel');
const User = require('../models/userModel');
const Community = require('../models/communityModel.js')
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
            return { success: false, error: `community does not exists.` };
        }

        const user = await User.findOne({username: username})
        
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
            let savedmention=[];
            let  userNotMentioned=[];
            if (mentions) {
                let mentiondata=mentions.map(mention => mention.substring(1));
               
                
                for (const checkUser of mentiondata){
                    const userChecker= await User.findOne({username:checkUser})
                    if (userChecker){
                        
                        if(checkUser == username){
                            userNotMentioned.push(checkUser);
                            continue;
                        }
                        if((user.blockedUsers && user.blockedUsers.includes(checkUser)) || 
                        (userChecker.blockedUsers && userChecker.blockedUsers.includes(user.username))){
                            userNotMentioned.push(checkUser);
                            continue;
                        }
                        const mention = new Mention({ mentionedBy:username,mentioned:checkUser,type:"post",entityId:savedPost._id });
                        
                        mention.save();
                        savedmention.push(checkUser);
                        const notificationMessage = `${username}: Mentioned you in a post`;
                        pushNotificationService.sendPushNotificationToToken(userChecker.deviceToken, 'Sarakel',notificationMessage )
                      
                        
                    }
                }
              
                
                 if(!userNotMentioned || !userNotMentioned.length == 0){
                    return { success: true,message: "Post sent, but the following users were not mentioned(because block or trying to mention yourself): " + userNotMentioned.join(", ") }
                }
                else if (savedmention.length === mentiondata.length) {
                    return { success: true, message: 'post sent successfully with mentions.' };
                }
                else{
                    return { success: true, message: 'post sent successfully but some mentioned users do not exist',missingUsers: mentiondata.filter(username => !savedmention.includes(username)) };
                }
                
            }
    

        }

        await pushNotificationService.sendPushNotificationToToken(user.deviceToken, 'Sarakel', 'New post created successfully');
        console.log('Notification sent');    

        return { success: true, message: `Post created successfully` };
        } catch (error) {
            console.error("Error creating post:", error);
            throw new Error("Failed to create post");
        }
    }
};

module.exports = createPostService;
