
spoilerService=require('../services/spoilerService')
const spoilerController = {

  markAsSpoiler: async (req, res) => {
    try {
      const {entityId,type} = req.body;
 
      let username =req.user;
      
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }

    const result=await spoilerService.spoilerPost(entityId, username,type );
    
    if (result.success) {
    
    res.status(200).json({ message: 'spoiler  successfully.' });
  } else {
    res.status(400).json({ errors: result.errors, message: result.error });
}
} catch (error) {
  res.status(500).json({ success: false, message: 'Failed to spoiler', error: error.message });
}
  },
  unmarkAsSpoiler: async (req, res) => {
    try {
      const {entityId,type} = req.body;
 
      let username =req.user;
      
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }

    const result=await spoilerService.unspoilerPost(entityId, username,type );
    
    if (result.success) {
    
    res.status(200).json({ message: 'unspoiler  successfully.' });
  } else {
    res.status(400).json({ errors: result.errors, message: result.error });
}
} catch (error) {
  res.status(500).json({ success: false, message: 'Failed to unspoiler', error: error.message });
}
  },

};

module.exports = spoilerController;
