const { Router } = require('express');
const router = Router();

const {
    customerGet,
    customerPost
} = require('../controllers/customer.controller');

router.get('/', 
    customerGet
);

router.post('/',
    customerPost
);

module.exports = router;