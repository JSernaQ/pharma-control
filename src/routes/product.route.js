const { Router } = require('express');
const { verifyJWT } = require('../middleware/verify-jwt')
const router = Router();

const {
    productCreateGet,
    productCreatePost,
    productsInventoryGet,
    productsGet
} = require('../controllers/product.constroller')

router.get('/',
    verifyJWT,
    productsGet
);

router.get('/inventario',
    verifyJWT,
    productsInventoryGet
);

router.get('/crear', 
    verifyJWT,
    productCreateGet
);

router.post('/crear',
    verifyJWT,
    productCreatePost
);


module.exports = router;