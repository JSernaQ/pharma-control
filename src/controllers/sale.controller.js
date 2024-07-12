const { Product } = require('../models/product.model');
const { Customer } = require('../models/customer.model');
const { Sale } = require('../models/sale.model');

const salePageGet = async (req, res) => {
    const msg = req.query.msg || undefined
    const error = req.query.error || undefined

    try {
        const products = await Product.find();
        const customers = await Customer.find();
        res.render('sales', { customers, products, msg, error });
    } catch (error) {
        console.error('Error al obtener productos y clientes:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const saveSale = async (req, res) => {
    try {

        const { products, total } = req.body;

        const saleProducts = products.map((product) => {
            return {
                product: product.productName,
                quantity: product.quantity,
                unitPrice: product.unitPrice
            };
        });

        const newSale = await Sale.create({products: saleProducts, total});

        res.status(200).send('Venta registrada exitosamente');

    } catch (error) {
        console.error('Error al guardar la venta:', error);
        res.status(400).send('Error al guardar la venta');
    }
}

module.exports = {
    salePageGet,
    saveSale
};
