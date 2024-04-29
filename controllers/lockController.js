const { request } = require('express');
const lockService = require('../services/lockService');
const jwt = require('jsonwebtoken');
const lockController = {

  lockPost: async (req, res) => {
    try {
      const {Id} = req.body;
      
      let username =req.user;
      // console.log(req.user.iat);
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }

    const result=await lockService.lockPost( username ,Id);
    
    if (result.success) {
    
    res.status(200).json({ message: 'locked successfully.' });
  } else {
    res.status(400).json({ errors: result.errors, message: result.error });
}
  } catch (error) {
    
    console.error('Failed to lock:', error);
    res.status(500).json({ error: 'Failed to lock.' });
  }
  },
  unlockPost: async (req, res) => {
    try {
      const {Id} = req.body;
      
      let username =req.user;
      // console.log(req.user.iat);
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }

    const result=await lockService.unlockPost( username ,Id);
    
    if (result.success) {
    
    res.status(200).json({ message: 'unlocked successfully.' });
  } else {
    res.status(400).json({ errors: result.errors, message: result.error });
}
  } catch (error) {
    
    console.error('Failed to unlock:', error);
    res.status(500).json({ error: 'Failed to unlock.' });
  }
  },
};

module.exports = lockController;
