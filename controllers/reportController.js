const reportService=require('../services/reportService');

const reportController = {
  reportThing: async (req, res) => {
 try{
    const {reportedUsername,reason,type,entityId,description} = req.body;
 
    let username =req.user;
    
    if (req.user?.iat){
      username=req.user.username;
    }
else{
  username=req.user;
}

  const result=await reportService.reportThing(reportedUsername,reason,type,entityId,description, username );
  
  if (result.success) {
  
  res.status(200).json({ message: 'Thank you for reporting. We will review it soon' });
} else {
  res.status(400).json({ errors: result.errors, message: result.error });
}
} catch (error) {
res.status(500).json({ success: false, message: 'Failed to report ', error: error.message });
}
  },
};

module.exports = reportController;
