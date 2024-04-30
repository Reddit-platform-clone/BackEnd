const multer = require('multer');

// Define storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original file name
    }
});

// Create multer instance with storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
