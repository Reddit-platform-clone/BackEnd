const commentController = {

  getCommentReplies: async (req, res) => {
    try {
      const commentReplies = [
        {
          replyId: 1, commentId: 123, author: 'user1', content: 'Reply to comment 123',
        },
        {
          replyId: 2, commentId: 123, author: 'user2', content: 'Another reply to comment 123',
        },
      ];
      res.json({ success: true, data: commentReplies });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve comment replies', error: error.message });
    }
  },
};

module.exports = commentController;
