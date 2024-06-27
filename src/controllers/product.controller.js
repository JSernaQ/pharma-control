const { Product } = require('../models/product.model');
const { fieldValidation } = require('../helpers/fieldsValidations');
const Validation = new fieldValidation;

const productsGet = async (req, res) => {
    const msg = req.query.msg || undefined
    const error = req.query.error || undefined
    try {
        const productsItemsDB = await Product.find();
        res.render('products/mainProducts', { products: productsItemsDB, msg, error })
    } catch (error) {
        res.status(404).json({
            success: false,
            err: error
        })
    }
};

const productsInventoryGet = async (req, res) => {
    try {

        const productsItemsDB = await Product.find();
        return res.status(200).render('products/inventory', { productsItems: productsItemsDB })

    } catch (error) {
        res.status(404).json({
            success: false,
            err: error
        })
    }
};


const productCreateGet = async (req, res) => {
    const msg = req.query.msg || undefined
    const error = req.query.error || undefined

    try {
        res.render('products/productCreate', { msg, error })
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
        const { barCode, productName, productDescription, price, stock, minStock } = req.body;

        if (price < 0 || stock < 0 || minStock < 0) {
            return res.status(400).redirect('/productos/crear?error=Revisa los campos')
        }

        const newProduct = await Product.create({
            barCode, productName, productDescription, price, stock, minStock, inputs: 0, outputs: 0, isActive: true, supplier: 'None'
        });

        return res.status(201).redirect('/productos?msg=Producto registrado con exito')

    } catch (error) {
        console.log(error);
        return res.status(400).redirect('/productos/crear?error=Hubo un problema al registrar el producto')
    }

}

module.exports = {
    productCreateGet,
    productCreatePost,
    productsInventoryGet,
    productsGet
}