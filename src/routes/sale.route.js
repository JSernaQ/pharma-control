const { Router } = require('express');
const { verifyJWT } = require('../middleware/verify-jwt')
const router = Router();

const {
    salePageGet,
    saveSale
} = require('../controllers/sales/sale.controller');

const { 
    saleHistoryGet
} = require('../controllers/sales/saleHistory.controller');

router.get('/',
    verifyJWT,
    salePageGet
);

router.post('/save', 
    verifyJWT,
    saveSale
);

router.get('/historial', 
    verifyJWT,
    saleHistoryGet
);


module.exports = router;