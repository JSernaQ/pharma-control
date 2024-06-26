const { Router } = require('express');
const { verifyJWT } = require('../middleware/verify-jwt')
const router = Router();

const {
    salePageGet
} = require('../controllers/sale.controller')

router.get('/',
    verifyJWT,
    salePageGet
);


module.exports = router;