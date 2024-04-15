

const voteController = {
    castVote: async (req, res) => {
        try {
            const { id, dir } = req.body; 
            const voteType = dir === 1 ? 'upvote' : dir === -1 ? 'downvote' : 'unvote';
            const message = `Vote casted ${voteType} for item with ID ${id}`; 
            
            res.json({ success: true, message: message });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to cast vote', error: error.message });
        }
    }
};

module.exports = voteController;
