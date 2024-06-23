const { Router } = require('express');
const { verifyJWT } = require('../middleware/verify-jwt');
const router = Router();

const { 
    authLoginGet, authLoginPost, authRegisterGet, authRegisterPost 
} = require('../controllers/auth.controller');


router.get('/login',
    authLoginGet
);

router.post('/login', 
    authLoginPost
);

router.get('/register',
    // verifyJWT,
    authRegisterGet
);

router.post('/register',
    // verifyJWT,
    authRegisterPost
);

module.exports= router;