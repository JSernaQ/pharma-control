const { Router } = require('express');
const router = Router();

const {
    salePageGet
} = require('../controllers/sale.controller')

router.get('/',
    salePageGet
);


module.exports = router;