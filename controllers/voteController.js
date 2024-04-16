

const { request } = require('express');
const voteService = require('../services/voteService');
const jwt = require('jsonwebtoken');

const voteController = {
    castVote: async (req, res) => {
        try {
           
            let username =req.user;
            // console.log(req.user.iat);
            if (req.user?.iat){
              username=req.user.username;
            }
        else{
          username=req.user;
        }
        
            const { rank, type, entityId } = req.body;
          
      console.log(rank)
            const result = await voteService.castVote({ rank, type, entityId,username });
      
            if (result.success) {
                res.status(200).json({ message: result.message });
            } else {
                res.status(400).json({ errors: result.errors, message: result.error });
            }
        } catch (error) {
            
            res.status(500).json({ error: 'Failed to send vote.' });
        }
    }
};

module.exports = voteController;
