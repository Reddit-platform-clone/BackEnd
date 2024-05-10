const communityService = require('../services/communityService.js');
const User = require('../models/userModel.js');
const Community = require('../models/communityModel.js');
const pushNotificationService = require('../services/notificationsService.js');

jest.mock('../models/userModel.js');
jest.mock('../models/communityModel.js');
jest.mock('../services/notificationsService.js');

describe('Community services', () => {
    it('should join a user to a community', async () => {
        const mockSave = jest.fn();
        const mockUser = { username: 'testUser', joinedCommunities: [], save: mockSave };
        const mockCommunity = { communityName: 'Joe', members: [], save: mockSave };

        User.findOne.mockResolvedValue(mockUser);
        Community.findOne.mockResolvedValue(mockCommunity);

        const result = await communityService.join('testUser', 'testCommunity');
        console.log(result)
        expect(result.success).toBe(true);
        expect(result.message).toBe('User joined community successfully');
        expect(mockUser.joinedCommunities).toContain('testCommunity');
        expect(mockCommunity.members).toContain('testUser');
    });

    it('should handle user not found', async () => {
        User.findOne.mockResolvedValue(null);

        const result = await communityService.join('nonExistentUser', 'testCommunity');

        expect(result.success).toBe(false);
        expect(result.error).toBe('user not found');
    });

    it('should handle community not found', async () => {
        User.findOne.mockResolvedValue({});
        Community.findOne.mockResolvedValue(null);

        const result = await communityService.join('testUser', 'nonExistentCommunity');

        expect(result.success).toBe(false);
        expect(result.message).toBe('Community not found');
    });

    it('should remove a user from a community', async () => {
        const mockSave = jest.fn();
        const mockUser = { username: 'testUser', joinedCommunities: ['testCommunity'], save: mockSave };
        const mockCommunity = { communityName: 'testCommunity', members: ['testUser'], save: mockSave };

        User.findOne.mockResolvedValue(mockUser);
        Community.findOne.mockResolvedValue(mockCommunity);

        const result = await communityService.leave('testUser', 'testCommunity');
        console.log(result);
        expect(result.success).toBe(true);
        expect(result.message).toBe('User left community successfully');
        expect(mockUser.joinedCommunities).not.toContain('testCommunity');
        expect(mockCommunity.members).not.toContain('testUser');
    });

    it('should handle user not a member of the community', async () => {
        const mockUser = { username: 'testUser', joinedCommunities: [], save: jest.fn() };
        const mockCommunity = { communityName: 'testCommunity', members: [], save: jest.fn() };

        User.findOne.mockResolvedValue(mockUser);
        Community.findOne.mockResolvedValue(mockCommunity);

        const result = await communityService.leave('testUser', 'testCommunity');

        expect(result.success).toBe(false);
        expect(result.error).toBe('User is not a member of this community');
    });

    it('should list all communities', async () => {
        const mockCommunities = [
            { communityName: 'Community 1', category: 'Category 1' },
            { communityName: 'Community 2', category: 'Category 2' }
        ];

        Community.find.mockResolvedValue(mockCommunities);

        const result = await communityService.listCommunities();

        expect(result).toEqual(mockCommunities);
    });

    it('should handle error fetching communities', async () => {
        Community.find.mockRejectedValue(new Error('Failed to fetch communities'));

        await expect(communityService.listCommunities()).rejects.toThrow('Failed to fetch communities');
    });

    it('should create a new community', async () => {
        const mockSave = jest.fn();
        const mockUser = { username: 'testUser', joinedCommunities: [], save: mockSave, deviceToken: 'testToken' };
        const mockCommunityData = {
            communityName: 'Test Community',
            moderatorsUsernames: ['testUser'],
            // Add other required community data here
        };

        User.findOneAndUpdate.mockResolvedValue(mockUser);
        Community.findOne.mockResolvedValue(null);
        Community.mockReturnValueOnce({ save: mockSave });

        const result = await communityService.create('testUser', mockCommunityData);

        expect(result.success).toBe(true);
        expect(result.message).toBe('Community created successfully');
        expect(mockUser.joinedCommunities).toContain('Test Community');
        expect(pushNotificationService.sendPushNotificationToToken).toHaveBeenCalledWith('testToken', 'Sarakel', 'New community created successfully');
    });
});