const unmarkNSFWController = {
    unmarkNSFW: async (req, res) => {
        try {
            const { id } = req.body; 
            const message = `Link with ID ${id} has been successfully unmarked as NSFW`;
            res.json({ success: true, message: message });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to unmark link as NSFW', error: error.message });
        }
    }
};

module.exports = unmarkNSFWController;
