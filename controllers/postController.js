
const postController = {

  getPostReplies: async (req, res) => {
    try {
      const postReplies = [
        {
          replyId: 1, postId: 123, author: 'user1', content: 'Reply to post 123',
        },
        {
          replyId: 2, postId: 123, author: 'user2', content: 'Another reply to post 123',
        },
      ];
      res.json({ success: true, data: postReplies });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve post replies', error: error.message });
    }
  },
};

module.exports = postController;
