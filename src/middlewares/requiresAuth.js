const jwt = require('jsonwebtoken');

// Middleware para validar el token (rutas protegidas)
const requiresAuth = (req, res, next) => {
    const token = req.headers.authorization;

    // Se verifica si el request posee el header authorization
    if (!token) return res.status(401).json({ error: 'No token provided.' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ error: 'Invalid token', token_error: err });
        } else {
            req.user = decodedToken;
            next();
        }
    });
}

const verifyRoles = (roles = []) => {
    return [
        (req, res, next) => {
            const { user } = req;
            if (roles.length && !roles.includes(user.role)) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            next();
        }
    ]
};

module.exports = requiresAuth;