const commentService = require('../services/commentService');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const UserModel = require('../models/userModel');
const Mention = require('../models/mentionModel');
const Modqueue = require('../models/modqueueModel');
const pushNotificationService = require('../services/notificationsService');

jest.mock('../models/commentModel');
jest.mock('../models/postModel');
jest.mock('../models/userModel');
jest.mock('../models/mentionModel');
jest.mock('../models/modqueueModel');
jest.mock('../services/notificationsService');

describe('commentService - postComment', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should post a comment successfully', async () => {
        
        const commentData = {
            content: 'Test comment',
            postID: 'testPostId',
            replyToID: 'testReplyId',
        };
        const username = 'testUser';

       
        UserModel.findOne = jest.fn().mockResolvedValue({ username });
        Post.findOne = jest.fn().mockResolvedValue({ _id: 'testPostId', username: 'postOwner' });
        Comment.prototype.save = jest.fn().mockResolvedValue({ _id: 'mockCommentId' });
        Comment.findOne = jest.fn().mockResolvedValue({ _id: 'testReplyId', userID: 'replyOwner' });

        
        const expectedResult = {
            success: true,
            message: 'comment sent successfully.',
        };

        
        const result = await commentService.postComment({ commentData, username, rr: 'reply' });

       
        expect(result).toEqual(expectedResult);
        expect(pushNotificationService.sendPushNotificationToToken).toHaveBeenCalled();
    });

    it('shouldnt post a comment because of missing replytoID', async () => {
        
        const commentData = {
            content: 'Test comment',
            postID: 'testPostId',
          
        };
        const username = 'testUser';

       
        UserModel.findOne = jest.fn().mockResolvedValue({ username });
        Post.findOne = jest.fn().mockResolvedValue({ _id: 'testPostId', username: 'postOwner' });
        Comment.prototype.save = jest.fn().mockResolvedValue({ _id: 'mockCommentId' });
       

        
        const expectedResult = {
            success: false,
            error: "replyToID  is missing.",
        };

        
        const result = await commentService.postComment({ commentData, username, rr: 'reply' });

       
        expect(result).toEqual(expectedResult);
        
    });

});

describe('commentService - getCommentReplies', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get comment replies successfully', async () => {
        
        const commentID = 'testCommentId';

        
        Comment.findOne = jest.fn().mockResolvedValue({ _id: commentID });
        Comment.find = jest.fn().mockResolvedValue([{ reply: 'testReply' }]);

        
        const expectedResult = {
            success: true,
            message: [{ reply: 'testReply' }],
        };

       
        const result = await commentService.getCommentReplies(commentID);

       
        expect(result).toEqual(expectedResult);
    });

  
});

describe('commentService - deleteComment', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a comment successfully', async () => {
       
        const userID = 'testUser';
        const commentId = 'testCommentId';

        
        UserModel.findOne = jest.fn().mockResolvedValue({ username: userID });
        Comment.findOne = jest.fn().mockResolvedValue({ _id: commentId, userID });
        Comment.findOneAndDelete = jest.fn().mockResolvedValue({});

        
        const expectedResult = {
            success: true,
            message: 'comment deleted successfully',
        };

        
        const result = await commentService.deleteComment(userID, commentId);

        
        expect(result).toEqual(expectedResult);
    });

    
});
