const { User } = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');
const { DBValidators } = require('../helpers/db-validators')
const DBValidator = new DBValidators;

const authLoginGet = (req, res) => {

    const msg = req.query.msg || undefined;
    const error = req.query.error || undefined;
    try {
        res.render('auth/login', { msg, error })
    } catch (error) {

    }
};  

const authLoginPost = async (req, res) => {

    const { email, password } = req.body;

    try {
        const access = await DBValidator.loginValidator(email, password);
        if (!access) {
            return res.status(400).redirect('/auth/login?error=Verifica los datos de acceso');
        }

        const token = generateJWT();

        res.status(200).cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        res.redirect('/?msg=Bienvenido')

    } catch (error) {
        res.status(400).redirect(`/auth/login?error=${error.message}`)
        console.log('error');
    }

};

const authRegisterGet = (req, res) => {
    const msg = req.query.msg || undefined;
    return res.status(200).render('auth/register', {msg});
};

const authRegisterPost = async (req, res) => {
    const { username, email, password1, password2 } = req.body;
    if (password1 == password2) { 
        return await DBValidator.userRegister(res, username, email, password1)
    }
    
    return res.status(400).redirect('/auth/register?error=Contraseñas no coinciden') 
}

const logout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).redirect('/?msg=Adiós') 
    } catch (error) {
        console.log(error.message);
    }
    return
}

module.exports = {
    authLoginGet,
    authLoginPost,
    authRegisterGet,
    authRegisterPost,
    logout
};
