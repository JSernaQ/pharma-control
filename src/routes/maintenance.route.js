const { Router } = require('express');
const { verifyJWT } = require('../middleware/verify-jwt');
const router = Router();

router.get('/', verifyJWT, (req, res) => {
    const msg = req.query.msg || undefined
    const error = req.query.error || undefined
    const user = req.user || undefined

    return res.status(200).render('maintenance', {msg, error, user});
});

module.exports = router;