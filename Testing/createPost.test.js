const createPostService = require('../services/createPostService');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Community = require('../models/communityModel');
const Mention = require('../models/mentionModel');
const pushNotificationService = require('../services/notificationsService');

jest.mock('../services/notificationsService');

describe('createPostService - createPost', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a post successfully', async () => {
        const mockUser = { username: 'testUser', deviceToken: 'mockDeviceToken', blockedUsers: [] };
        const mockCommunity = { communityName: 'testCommunity', posts: [], banned: [],save: jest.fn() };

        User.findOne = jest.fn().mockResolvedValue(mockUser);
        Community.findOne = jest.fn().mockResolvedValue(mockCommunity);
        Post.prototype.save = jest.fn().mockResolvedValue({ _id: 'mockPostId' });

        const postData = {
            title: 'Test Post',
            content: 'This is a test post',
            communityId: 'testCommunity',
        };

        const result = await createPostService.createPost(postData, 'testUser');

        expect(result.success).toBe(true);
        expect(result.message).toBe('Post created successfully');
        expect(mockCommunity.posts).toContain('mockPostId');
        expect(pushNotificationService.sendPushNotificationToToken).toHaveBeenCalledWith(
            'mockDeviceToken',
            'Sarakel',
            'New post created successfully'
        );
    });

    it('should handle missing required fields', async () => {
        const postData = { content: 'Missing Title', communityId: 'testCommunity' };

        const result = await createPostService.createPost(postData, 'testUser');

        expect(result.success).toBe(false);
        expect(result.error).toContain('title or communityId is null');
    });

    it('should handle non-existent community', async () => {
        Community.findOne = jest.fn().mockResolvedValue(null);

        const postData = { title: 'Non-existent Community', communityId: 'invalidCommunityId' };

        const result = await createPostService.createPost(postData, 'testUser');

        expect(result.success).toBe(false);
        expect(result.error).toContain('community does not exist');
    });
});
