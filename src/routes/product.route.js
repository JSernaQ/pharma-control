const { Router } = require('express');
const { verifyJWT } = require('../middleware/verify-jwt')
const router = Router();

const {
    productCreateGet,
    productCreatePost,
    productsInventoryGet,
    productsGet,
    productDelete,
    getProductUpdate,
    putProductUpdate
} = require('../controllers/product.controller')

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

router.get('/eliminar/:_id',
    verifyJWT,
    productDelete
)

router.get('/editar/:id',
    verifyJWT,
    getProductUpdate
)

router.post('/editar/:id',
    verifyJWT,
    putProductUpdate
)


module.exports = router;