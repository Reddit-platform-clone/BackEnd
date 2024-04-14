const editService = require('../services/editService');

const editController = {

  editUserText: async (req, res) => {
    try {
      const data = req.body;
    
      let username =req.user;
      // console.log(req.user.iat);
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }
   
      
      const result =await editService.editUserText( username ,data);

      if (result.success) {
      res.status(200).json({ message: 'Text editted successfully.' });
    } else {
      res.status(400).json({ errors: result.errors, message: result.error });
  }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to edit body text', error: error.message });
    }
  },
};

module.exports = editController;
