require ('dotenv').config();

const jwt = require('jsonwebtoken');

const userAuth = {
    authorizeationToken: (req, res, next) => {
        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];
        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    },

    authorizeAccess: (req, res, next) => {
        // compare payload with username we wish to access info from
    }
}

module.exports = userAuth;