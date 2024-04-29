const { request } = require('express');
const nsfwService = require('../services/nsfwService');
const jwt = require('jsonwebtoken');

const nsfwController = {


  markNsfwModPosts: async (req, res) => {
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

      const result=await nsfwService.markNsfwModPosts( username ,Id);
      
      if (result.success) {
      
      res.status(200).json({ message: 'marked nsfw successfully.' });
    } else {
      res.status(400).json({ errors: result.errors, message: result.error });
  }
    } catch (error) {
      
      console.error('Failed to mark:', error);
      res.status(500).json({ error: 'Failed to mark.' });
    }
  },
  unmarkNsfwModPosts: async (req, res) => {
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

    const result=await nsfwService.unmarkNsfwModPosts( username ,Id);
    
    if (result.success) {
    
    res.status(200).json({ message: 'unmarked nsfw successfully.' });
  } else {
    res.status(400).json({ errors: result.errors, message: result.error });
}
  } catch (error) {
    
    console.error('Failed to unmark :', error);
    res.status(500).json({ error: 'Failed to unmark.' });
  }
  },
};

module.exports = nsfwController;
