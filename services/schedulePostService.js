const Agenda = require('agenda');
const mongoose = require('mongoose');
const createPostService = require('./createPostService'); // Import your createPost service

const agenda = new Agenda({ mongo: mongoose.connection });

// Define the job outside of schedulePost
agenda.define('createPost', async job => {
    const { postData, username } = job.attrs.data; // Destructure postData and username from job data
    await createPostService.createPost(postData, username);
});

const schedulePostService = {
    schedulePost: async (postData, username, scheduledTime) => {
        let success = false;
        try {
            // Schedule the job to run at the specified time
            await agenda.schedule(scheduledTime, 'createPost', { postData, username });
            return {success : true, message:'job added to queue'};
        } catch (error) {
            console.error('Error scheduling post:', error);
        }
        return {success:false, message:'failed to schedule'};
    }
};
module.exports = schedulePostService;
