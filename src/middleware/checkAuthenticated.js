const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || undefined;

    if (!token) {
        res.locals.isAuthenticated = false;
        res.locals.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);

        res.locals.isAuthenticated = true;
        res.locals.user = {userName: decoded.userName, rol: decoded.rol};
        return next();

    } catch (error) {
        console.error('Error:', error.message);
        res.locals.isAuthenticated = false;
        res.locals.user = null;
        return next();
    }

};

module.exports = { isAuthenticated }