const voteService = require('../services/voteService');
const Vote = require('../models/voteModel');
const UserModel = require('../models/userModel');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

jest.mock('../models/voteModel');
jest.mock('../models/userModel');
jest.mock('../models/commentModel');
jest.mock('../models/postModel');

describe('voteService - castVote', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should cast a vote on a comment successfully', async () => {
   
        const data = {
            rank: 1,
            type: 'comment',
            entityId: 'testCommentId',
            username: 'testUser',
        };

        UserModel.findOne = jest.fn().mockResolvedValue({ username: 'testUser' });
        Comment.findOne = jest.fn().mockResolvedValue({ _id: 'testCommentId', upvote: 0, downvote: 0, save: jest.fn() });
        Vote.findOne = jest.fn().mockResolvedValue(null);
        Vote.prototype.save = jest.fn().mockResolvedValue({});

        
        const expectedResult = {
            success: true,
            message: 'Vote sent successfully.',
        };

        const result = await voteService.castVote(data);

     
        expect(result).toEqual(expectedResult);
    });

    it('should handle missing rank field', async () => {
       
        const data = {
            type: 'comment',
            entityId: 'testCommentId',
            username: 'testUser',
        };

       
        const result = await voteService.castVote(data);

      
        expect(result.success).toBe(false);
        expect(result.error).toContain('rank is wrong');
    });

    it('should handle trying to upvote a comment already upvoted', async () => {
        
        const data = {
            rank: 1,
            type: 'comment',
            entityId: 'testCommentId',
            username: 'testUser',
        };

        
        UserModel.findOne = jest.fn().mockResolvedValue({ username: 'testUser' });
        Comment.findOne = jest.fn().mockResolvedValue({ _id: 'testCommentId', upvote: 1, downvote: 0, save: jest.fn() });
        Vote.findOne = jest.fn().mockResolvedValue({ rank: 1 }); // Mocking an existing upvote
        Vote.prototype.save = jest.fn().mockResolvedValue({});

        
        const result = await voteService.castVote(data);

        -
        expect(result.success).toBe(false);
        expect(result.error).toContain('user  already upvoted.');
    });
});
