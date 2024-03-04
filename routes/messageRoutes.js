

const express = require('express');
const router = express.Router();


router.post('/compose', (req, res) => {
    const { recipient, message } = req.body;
  
    // Logic for sending the message
    // This could involve saving the message to a database
  
    // test response
    res.json({ success: true, message: 'Message sent successfully' });
});

module.exports = router;
