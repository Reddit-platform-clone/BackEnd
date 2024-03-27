const unsaveController = {
    unsavePostOrComment: async (req, res) => {
      try {
        // const { type, id } = req.body;
        // let itemType;
        // switch (type) {
        //     case 'post':
        //         itemType = 'post';
        //         break;
        //     case 'comment':
        //         itemType = 'comment';
        //         break;
        //     default:
        //         return res.status(400).json({ success: false, message: 'Invalid item type' });
        // }
  
        res.json({ success: true, message: 'Unsaved commern 6 successfully' });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to unsave post or comment', error: error.message });
      }
    },
  };
  
  module.exports = unsaveController;
  