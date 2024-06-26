const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || undefined;

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWTSECRET);
            return res.status(401).redirect('/?error=Ya ingresaste al sistema');

        } catch (error) {

            console.log('Error:', error.message);
            return res.status(403).redirect('/auth/login?error=Sesión expirada')

        }
    }

    return next();
}

module.exports = { isAuthenticated }