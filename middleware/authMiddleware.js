require ('dotenv').config();

const jwt = require('jsonwebtoken');

const atuherizationToken = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}  

module.exports = atuherizationToken;