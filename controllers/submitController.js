const submitController = {
    submitLink: async (req, res) => {
        try {
           
            const { sr, title, url, kind, text, richtext_json } = req.body;
            
            if (!sr || !title || !kind) {
                throw new Error('Subreddit name, title, and post type (kind) are required');
            }

            if (kind === 'link' && !url) {
                throw new Error('URL is required for link submission');
            }

            if (kind === 'self' && (!text && !richtext_json)) {
                throw new Error('Text or richtext_json is required for self-post submission');
            }

            if (text && richtext_json) {
                throw new Error('Both text and richtext_json cannot be present');
            }

            const message = `Link submitted to subreddit ${sr} successfully`; 
            res.json({ success: true, message: message });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to submit link', error: error.message });
        }
    }
};

module.exports = submitController;
