const { Router } = require('express');
const { verifyJWT } = require('../middleware/verify-jwt');
const { isAuthenticated } = require('../middleware/checkAuthenticated');
const router = Router();

const { 
    authLoginGet,
    authLoginPost,
    authRegisterGet,
    authRegisterPost,
    logout
} = require('../controllers/auth.controller');


router.get('/login',
    isAuthenticated,
    authLoginGet
);

router.post('/login', 
    authLoginPost
);

router.get('/register',
    verifyJWT,
    authRegisterGet
);

router.post('/register',
    verifyJWT,
    authRegisterPost
);

router.get('/logout',
    verifyJWT,
    logout
)

module.exports= router;