const insightsController = {
    getInsightsCounts: async (req, res) => {
        try {
            
            const insightsCounts = {
                posts: 100,
                comments: 200,
                users: 50,
                
            };
            
            res.json({ success: true, data: insightsCounts });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to fetch insights counts', error: error.message });
        }
    }
};

module.exports = insightsController;
