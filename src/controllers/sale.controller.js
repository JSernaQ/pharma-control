const { Product } = require('../models/product.model');
const { Customer } = require('../models/customer.model');

const salePageGet = async (req, res) => {
    try {
        const products = await Product.find();
        const customers = await Customer.find();
        res.render('sales', { customers, products });
    } catch (error) {
        console.error('Error al obtener productos y clientes:', error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    salePageGet
};
