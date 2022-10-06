const jwt = require("jsonwebtoken");

const auth =
    ({ block }) =>
    (req, res, next) => {

        const token = req.headers.authorization;

        if (!token && block) return res.status(401).send("Unauthorized. Please log in.");

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch(err) {
            if (err && block) return res.status(401).send("Unauthorized. Please log in.");
        }
        next()
    };

module.exports = auth;


