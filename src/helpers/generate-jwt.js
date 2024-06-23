const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    try {
        return jwt.sign({ uid }, process.env.JWTSECRET , { expiresIn: '8h'});
    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    generateJWT
}