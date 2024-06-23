const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).redirect('/auth/login?error=Verifica los datos de acceso');
    }

    try {
        const decode = jwt.verify(token, process.env.JWTSECRET)
        console.log('decode',decode);        
        return next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = { verifyJWT }