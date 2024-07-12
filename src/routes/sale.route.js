const { Router } = require('express');
const { verifyJWT } = require('../middleware/verify-jwt')
const router = Router();

const {
    salePageGet,
    saveSale
} = require('../controllers/sale.controller')

router.get('/',
    // verifyJWT,
    salePageGet
);

router.post('/save', 
    saveSale
);


module.exports = router;