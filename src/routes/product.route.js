const { Router } = require('express');
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
    productsInventoryGet
);

router.get('/crear', 
    productCreateGet
);

router.post('/crear', 
    productCreatePost
);


module.exports = router;