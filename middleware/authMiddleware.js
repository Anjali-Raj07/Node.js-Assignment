const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token; 
    if (!token) {
        console.error('No token provided');
        return res.status(401).redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log('Decoded token:', decoded);

        req.user = {
            id: decoded.user.id,
            Role: decoded.user.Role,
            FirstName: decoded.user.FirstName
        };

        if (req.user.Role === 'Admin') {  
            next();  
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        console.error('Invalid token:', err.message);
        return res.status(401).redirect('/login');
    }
};

module.exports = authMiddleware;
