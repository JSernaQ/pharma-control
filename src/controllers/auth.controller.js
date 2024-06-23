const { User } = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');
const { DBValidators } = require('../helpers/db-validators')
const DBValidator = new DBValidators;

const authLoginGet = (req, res) => {

    const msg = req.query.msg || undefined;

    try {
        res.render('auth/login', { msg })
    } catch (error) {

    }
};

const authLoginPost = async (req, res) => {

    const { email, password } = req.body;

    try {
        const access = await DBValidator.loginValidator(email, password);
        if (!access) {
            return res.status(400).redirect('/auth/login?msg=Verifica los datos de acceso');
        }

        const token = generateJWT();

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });

        res.redirect('/?msg=Bienvenido')

    } catch (error) {
        res.render('auth/login', { error: null })
        console.log('error');
    }

};

const authRegisterGet = (req, res) => {
    const msg = req.query.msg || undefined;
    res.status(200).render('auth/register', {msg});
};

const authRegisterPost = async (req, res) => {
    const { username, email, password1, password2 } = req.body;
    if (password1 == password2) { 
        return await DBValidator.userRegister(res, username, email, password1)
    }
    
    return res.status(400).redirect('/auth/register?error=Contraseñas no coinciden') 
}

module.exports = {
    authLoginGet,
    authLoginPost,
    authRegisterGet,
    authRegisterPost
};
