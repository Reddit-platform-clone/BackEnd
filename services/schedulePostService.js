const schedule = require('node-schedule');
const Community = require('../models/communityModel.js')


const schedulePostService = {
    schedulePost: async (postData, username, scheduledTime) => {
        try {
            if(!postData.title || !postData.communityId){
                return { success: false, error: `title or communityId is null.` };
            }
            const community = await Community.findOne({communityName:postData.communityId })
            if(!community)
                { 
                 return { success: false, error: `community does not exists.` };
             }
            const job = schedule.scheduleJob(scheduledTime, async () => {
                console.log('Scheduled post created:', postData);
                await createPostService.createPost(postData, username);
            });
            console.log(`Post scheduled for ${scheduledTime}`);
            return { success: true, message: 'Post scheduled successfully' };
        } catch (error) {
            console.error('Error scheduling post:', error);
            throw new Error('Failed to schedule post');
        }
    }
};

module.exports = schedulePostService;
