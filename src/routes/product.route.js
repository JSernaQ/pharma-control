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
    productsGet
);

router.get('/inventario',
    verifyJWT,
    productsInventoryGet
);

router.get('/crear', 
    productCreateGet
);

router.post('/crear', 
    productCreatePost
);


module.exports = router;