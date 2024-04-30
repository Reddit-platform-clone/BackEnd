const cloudinary = require('cloudinary').v2
          
cloudinary.config({ 
  cloud_name: 'db9bbmpyn', 
  api_key: '427612759139259', 
  api_secret: 'A57s3SLb70HvDgA1tUrmPyZgCKg' 
});

module.exports = cloudinary;
