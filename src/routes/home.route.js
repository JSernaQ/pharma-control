const { Router } = require('express');
const router = Router();
const { verifyJWT } = require('../middleware/verify-jwt')
const { getHome } = require('../controllers/home.controller');

router.get('', getHome);

module.exports = router;