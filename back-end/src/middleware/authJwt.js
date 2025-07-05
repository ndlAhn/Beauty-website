const jwt = require('jsonwebtoken');

const authJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    // Debug log
    console.log('JWT token received:', token);
    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
        if (err) {
            console.log('JWT verification error:', err);
            return res.status(403).json({ error: 'Invalid token' });
        }
        console.log('JWT decoded payload:', decoded);
        req.user = decoded;
        next();
    });
};

module.exports = authJwt;
