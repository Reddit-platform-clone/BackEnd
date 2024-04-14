
hideService=require('../services/hideService')
const hideController = {

  hideLink: async (req, res) => {
    try {
      const {entityId,type} = req.body;
 
      let username =req.user;
      
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }

    const result=await hideService.hidePostOrComment(entityId, username,type );
    
    if (result.success) {
    
    res.status(200).json({ message: 'hide  successfully.' });
  } else {
    res.status(400).json({ errors: result.errors, message: result.error });
}
} catch (error) {
  res.status(500).json({ success: false, message: 'Failed to hide', error: error.message });
}
  },
  unhideLink: async (req, res) => {
    try {
      const {entityId,type} = req.body;
 
      let username =req.user;
      
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }

    const result=await hideService.unhidePostOrComment(entityId, username,type );
    
    if (result.success) {
    
    res.status(200).json({ message: 'unhide  successfully.' });
  } else {
    res.status(400).json({ errors: result.errors, message: result.error });
}
} catch (error) {
  res.status(500).json({ success: false, message: 'Failed to unhide', error: error.message });
}
  },

};

module.exports = hideController;
