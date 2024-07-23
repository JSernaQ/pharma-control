const { Purchase } = require('../../models/purchase.model');
const { Customer } = require('../../models/customer.model')
const { Product } = require('../../models/product.model');

const purchasePageGet = async (req, res) => {
    const msg = req.query.msg || undefined
    const error = req.query.error || undefined

    try {
        const products = await Product.find();
        const customers = await Customer.find();
        res.render('purchases/purchaseRegister', { customers, products, msg, error });
    } catch (error) {
        console.error('Error al obtener productos y clientes:', error);
        res.status(500).send('Error interno del servidor');
    }
};


const savepurchase = async (req, res) => {  
    try {

        const { products, total, seller } = req.body;

        const purchaseProducts = products.map((product) => {
            return {
                idProduct: product.id,
                productName: product.productName,
                quantity: product.quantity,
                unitPrice: product.unitPrice
            };
        });

        const newpurchase = await Purchase.create({products: purchaseProducts, total, seller});

        for (const product of purchaseProducts) {

            const idProduct = product.idProduct;

            const existingProduct = await Product.findById(idProduct);

            existingProduct.stock += product.quantity;
            existingProduct.inputs = parseInt(existingProduct.inputs, 10) + parseInt(product.quantity, 10);
            

            await existingProduct.save();
            
        }


        res.status(200).send('Compra registrada exitosamente');

    } catch (error) {
        console.error('Error al guardar la compra:', error);
        res.status(400).send('Error al guardar la compra');
    }
}

module.exports = {
    purchasePageGet,
    savepurchase
};
