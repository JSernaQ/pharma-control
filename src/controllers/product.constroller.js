const { Product } = require('../models/product.model');

const productsGet = (req, res) => {
    try {
        res.render('products/mainProducts')
    } catch (error) {
        console.log(error)
    }
};

const productsInventoryGet = async (req, res) => {
    try {
        const productsItemsDB = await Product.find();
        res.render('products/inventory', {productsItems: productsItemsDB})
        // res.status(200).json({
        //     success: true,
        //     message: 'Elementos encontrados'
        // });

    } catch (error) {
        res.status(404).json({
            success: false,
            err: error
        })
        console.log(error);
    }
};


const productCreateGet = async (req, res) => {
    try {
        res.render('products/productCreate', {alert: ''})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener informacion',
            error: error.message,
            
        });
        console.log(error);
    }
};

const productCreatePost = async (req, res) => {
    try {
        const { barCode, productName, productDescription, price, stock, minStock, inputs, outputs, supplier } = req.body;

        const newProduct = await Product.create({
            barCode, productName, productDescription, price, stock, minStock, inputs, outputs, supplier
        });

        res.render('mainProducts', {alert: 'Producto creado con exito'})

    } catch (error) {
        res.render('products/productCreate', {alert: 'Error al crear producto'})

        console.log(error);
    }
}

module.exports = {
    productCreateGet,
    productCreatePost,
    productsInventoryGet,
    productsGet
}