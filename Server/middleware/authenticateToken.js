const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is sent in 'Bearer <token>' format

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.sendStatus(403);

        try {
            const user = await User.findById(decoded.sub);
            if (!user) return res.sendStatus(404);
            req.user = { id: user._id, ...user.toObject() }; // Save user ID and user data
            next();
        } catch (error) {
            res.sendStatus(500);
        }
    });
};

module.exports = authenticateToken;
