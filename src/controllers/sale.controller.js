const { Sale } = require('../models/sale.model')

const salePageGet = (req, res) => {
    res.render('sales')
};

module.exports = {
    salePageGet
}