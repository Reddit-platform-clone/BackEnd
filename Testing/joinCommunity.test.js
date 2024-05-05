const communityService = require('../services/communityService.js');
const User = require('../models/userModel.js');
const Community = require('../models/communityModel.js');

jest.mock('../models/userModel.js');
jest.mock('../models/communityModel.js');

describe('UserService - join', () => {
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
});