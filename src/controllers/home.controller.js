const getHome = (req, res) => {
    const msg = req.query.msg || undefined;
    const error = req.query.error || undefined;
    res.render('home', {msg, error})
};

module.exports = {
    getHome
}