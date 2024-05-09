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
        // Mock data
        const data = {
            rank: 1,
            type: 'comment',
            entityId: 'testCommentId',
            username: 'testUser',
        };

        // Mock models
        UserModel.findOne = jest.fn().mockResolvedValue({ username: 'testUser' });
        Comment.findOne = jest.fn().mockResolvedValue({ _id: 'testCommentId', upvote: 0, downvote: 0, save: jest.fn() });
        Vote.findOne = jest.fn().mockResolvedValue(null);
        Vote.prototype.save = jest.fn().mockResolvedValue({});

        // Expected result
        const expectedResult = {
            success: true,
            message: 'Vote sent successfully.',
        };

        // Call service function
        const result = await voteService.castVote(data);

        // Assertions
        expect(result).toEqual(expectedResult);
    });

    it('should handle missing rank field', async () => {
        // Mock data
        const data = {
            type: 'comment',
            entityId: 'testCommentId',
            username: 'testUser',
        };

        // Call service function
        const result = await voteService.castVote(data);

        // Assertions
        expect(result.success).toBe(false);
        expect(result.error).toContain('rank is wrong');
    });

    it('should handle trying to upvote a comment already upvoted', async () => {
        // Mock data
        const data = {
            rank: 1,
            type: 'comment',
            entityId: 'testCommentId',
            username: 'testUser',
        };

        // Mock models
        UserModel.findOne = jest.fn().mockResolvedValue({ username: 'testUser' });
        Comment.findOne = jest.fn().mockResolvedValue({ _id: 'testCommentId', upvote: 1, downvote: 0, save: jest.fn() });
        Vote.findOne = jest.fn().mockResolvedValue({ rank: 1 }); // Mocking an existing upvote
        Vote.prototype.save = jest.fn().mockResolvedValue({});

        // Call service function
        const result = await voteService.castVote(data);

        // Assertions
        expect(result.success).toBe(false);
        expect(result.error).toContain('user  already upvoted.');
    });
});
