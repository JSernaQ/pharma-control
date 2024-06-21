const { Router } = require('express');
const router = Router();

const { getHome } = require('../controllers/home.controller');

router.get('', getHome);

module.exports = router;