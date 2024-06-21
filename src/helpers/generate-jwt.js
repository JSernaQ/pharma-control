const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    const expiresIn = 60 * 15

    try {
        return jwt.sign({ uid }, process.env.jwtSecret , { expiresIn });
    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    generateJWT
}