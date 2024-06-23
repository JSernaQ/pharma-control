const getHome = (req, res) => {
    const msg = req.query.msg || undefined;
    res.render('home', {msg})
};

module.exports = {
    getHome
}