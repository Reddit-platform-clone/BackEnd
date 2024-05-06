require ('dotenv').config();

const jwt = require('jsonwebtoken');
const moderationService = require('../services/moderationService')

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

    checkUserRole: async (req, res, next) => {
        // get user role
        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];
        let user;
        if (token == null) {
            user = { username: 'guest', role: 'not logged in' }
            req.user = user;
            return next();
        }

        try {
            user = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
            // console.log(username)
            const isModerator = await moderationService.checkIfModerator(req.params.subreddit, user.username);
            if (isModerator === 1) user.role = 'moderator';
            if (isModerator === 0) user.role = 'member';
            if (isModerator === -1) user.role = 'not a member';
            req.user = user;
            next();
        } catch (err) {
            res.status(403).json({ error: err.message });
        }      
    }
}

module.exports = userAuth;