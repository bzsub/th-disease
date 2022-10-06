const jwt = require("jsonwebtoken");

const auth =
    ({ block }) =>
    (req, res, next) => {

        const token = req.headers.authorization;

        if (!token && block) return res.sendStatus(401);

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch(err) {
            if (err && block) return res.sendStatus(401);
        }
        next()
    };

module.exports = auth;


