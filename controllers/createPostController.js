const postService = require('../services/createPostService');
const jobScheduler = require('../services/schedulePostService');

const CreatePostController = {
    createPost: async (req, res) => 
    {
        
        try 
        {

            let username =req.user;
            if (req.user?.iat){
                username=req.user.username;
            }
            else{
                username=req.user;
                }

            const postData = req.body;

            if(postData.scheduled == null){
                console.log("No schedule added");
            }
            else
            {
                const scheduledTime = postData.scheduled;
                console.log(scheduledTime);
                const scheduleResult = await jobScheduler.schedulePost(postData, username, scheduledTime);

                if (scheduleResult.success) {
                    console.log(scheduleResult)
                    console.log("post scheduled")
                    res.status(200).json({ message: scheduleResult.message });
                } 
                else 
                {
                    res.status(400).json({ errors: scheduleResult.errors, message: scheduleResult.error });
                }
            }
           
            const result = await postService.createPost(postData,username); 
            if (result.success) {
                console.log(result)
                res.status(200).json({ message: result.message });
            } else {
                res.status(400).json({ errors: result.error, message: result.error });
            }
        } 
        catch (error) 
        {
            console.error('Error composing message:', error);
            res.status(500).json({ error: 'Failed to send message.' });
        }
    }
};

module.exports = CreatePostController;
