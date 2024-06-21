const { response, request } = require('express');
const { User } = require('../models/user.model');

const authLogin = (req, res) => {
    res.render('auth/login')
};

module.exports = {
    authLogin
};
