const subredditService = require('../services/subredditService');
const Post = require('../models/postModel');

// Mock the subreddit model methods
jest.mock('../models/postModel', () => ({
    find: jest.fn(),
}));

describe('Testing listing endpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should return the best post when posts are available', async () => {
        // Mock data for testing
        const mockPosts= [
            {post_id: 1, upvotes: 100, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false},
            {post_id: 2, upvotes: 150, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false},
            {post_id: 3, upvotes: 120, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false},
        ];

        Post.find.mockResolvedValue(mockPosts);

        const bestPost = await subredditService.getBest();
        expect(bestPost).toEqual({post_id: 2, upvotes: 150, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false});
    });

    it('Should return the hot post when posts are available', async () => {
        // Mock data for testing
        const currentDate = new Date();
        const mockPosts= [
            {post_id: 1, upvotes: 100, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false, date_time: currentDate.getMinutes()},
            {post_id: 2, upvotes: 150, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false, date_time: currentDate.getMinutes()},
            {post_id: 3, upvotes: 120, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false, date_time: currentDate.getMinutes()},
        ];

        Post.find.mockResolvedValue(mockPosts);

        const hotPost = await subredditService.getHot();
        expect(hotPost).toEqual({post_id: 2, upvotes: 150, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false, date_time: currentDate.getMinutes()});
    });

    it('Should return the new post when posts are available', async () => {
        // Mock data for testing
        const currentDate = new Date();
        const mockPosts= [
            {post_id: 1, upvotes: 100, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false, date_time: currentDate.getMinutes() -1},
            {post_id: 2, upvotes: 150, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false, date_time: currentDate.getMinutes() -2},
            {post_id: 3, upvotes: 120, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false, date_time: currentDate.getMinutes()},
        ];

        Post.find.mockResolvedValue(mockPosts);

        const newPost = await subredditService.getNew();
        expect(newPost).toEqual({post_id: 3, upvotes: 120, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false, date_time: currentDate.getMinutes()});
    });

    it('Should return the top post when posts are available', async () => {
        // Mock data for testing
        const mockPosts= [
            {post_id: 1, upvotes: 100, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false},
            {post_id: 2, upvotes: 150, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false},
            {post_id: 3, upvotes: 120, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false},
        ];

        Post.find.mockResolvedValue(mockPosts);

        const topPost = await subredditService.getTop();
        expect(topPost).toEqual({post_id: 2, upvotes: 150, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false});
    });

    it('Should return a random post when posts are available', async () => {
        // Mock data for testing
        const mockPosts= [
            {post_id: 1, upvotes: 100, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false},
            {post_id: 2, upvotes: 150, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false},
            {post_id: 3, upvotes: 120, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false},
        ];

        Post.find.mockResolvedValue(mockPosts);

        const randomPost = await subredditService.getRandom();
        expect(randomPost).toEqual({post_id: 2, upvotes: 150, user_id: 'yousefwael02', parent_id: 1, Subreddit_id: 1, num_comments: 1, num_views:1, is_locked: false});
    });

    it('should return null when no posts are available', async () => {
        Subreddit.find.mockResolvedValue([]);

        const bestPost = await subredditService.getBest();

        expect(bestPost).toBeNull();
    });

    it('should handle errors and throw an error message', async () => {
        Subreddit.find.mockRejectedValue(new Error('Database error'));

        await expect(subredditService.getBest()).rejects.toThrow('Failed to fetch best post');
    });
})