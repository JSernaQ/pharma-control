const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    const msg = req.query.msg || undefined
    const error = req.query.error || undefined
    return res.status(200).render('maintenance', {msg, error});
});

module.exports = router;