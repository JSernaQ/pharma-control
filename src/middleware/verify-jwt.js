const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).redirect('/auth/login?error=Debes ingresar al sistema');
    }

    try {

        const decoded = jwt.verify(token, process.env.JWTSECRET);

        return next();

    } catch (error) {
        console.log('Error:', error.message);
        return res.status(403).redirect('/auth/login?error=Sesión expirada')
    }
}

module.exports = { verifyJWT }