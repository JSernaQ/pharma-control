const { Router } = require('express');
const { verifyJWT } = require('../middleware/verify-jwt')
const router = Router();

const {
    purchasePageGet,
    savepurchase
} = require('../controllers/purchases/purchase.controller');

const { 
    purchaseHistoryGet
} = require('../controllers/purchases/purchaseHistory.controller');

router.get('/',
    verifyJWT,
    purchasePageGet
);

router.post('/save', 
    verifyJWT,
    savepurchase
);

router.get('/historial', 
    verifyJWT,
    purchaseHistoryGet
);


module.exports = router;