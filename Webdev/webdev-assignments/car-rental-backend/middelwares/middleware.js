const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    // Expecting: Authorization: Bearer <token>
    if (!authHeader) {
        return res.status(401).send('Authorization token required');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).send('Invalid authorization format');
    }

    const token = parts[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).send('Invalid or expired token');
        }

        // decoded = { userId, iat, exp }
        req.user = decoded;
        next();
    });
}

module.exports = authenticateToken;