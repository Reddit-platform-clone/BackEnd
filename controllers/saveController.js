saveService=require('../services/saveService');

const saveController = {
  savePostOrComment: async (req, res) => {
    try {
      const {entityId,type} = req.body;
 
      let username =req.user;
      
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }

    const result=await saveService.savePostOrComment(entityId, username,type );
    
    if (result.success) {
    
    res.status(200).json({ message: 'saved  successfully.' });
  } else {
    res.status(400).json({ errors: result.errors, message: result.error });
}
} catch (error) {
  res.status(500).json({ success: false, message: 'Failed to save', error: error.message });
}
  }, 
  unsavePostOrComment: async (req, res) => {
    try {
      const {entityId,type} = req.body;
 
      let username =req.user;
      
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }

    const result=await saveService.unsavePostOrComment(entityId, username,type );
    
    if (result.success) {
    
    res.status(200).json({ message: 'unsaved successfully.' });
  } else {
    res.status(400).json({ errors: result.errors, message: result.error });
}
} catch (error) {
  res.status(500).json({ success: false, message: 'Failed to unsave', error: error.message });
}
  },
};

module.exports = saveController;
