const reportController = {
  reportThing: async (req, res) => {
    try {
    //   const { type, id } = req.params;
    //   const reportReason = req.body.reason;
    //   type = 'message';
    //   let itemType;
    //   switch (type) {
    //     case 'link':
    //       itemType = 'link';
    //       break;
    //     case 'comment':
    //       itemType = 'comment';
    //       break;
    //     case 'message':
    //       itemType = 'message';
    //       break;
    //     default:
    //       return res.status(400).json({ success: false, message: 'Invalid report type' });
    const message = 'Thank you for reporting message 4. We will review it soon.';

    res.json({ success: true, message });      
}

     
     catch (error) {
      res.status(500).json({ success: false, message: 'Failed to report thing', error: error.message });
    }
  },
};

module.exports = reportController;
