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

    const msg = req.query.msg || undefined
    const error = req.query.error || undefined

    try {

        const productsItemsDB = await Product.find();
        return res.status(200).render('products/inventory', { productsItems: productsItemsDB, msg, error })

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

const productDelete = async (req, res) => {

    const { _id } = req.params;

    try {

        const product = await Product.findByIdAndUpdate(_id, { isActive: false });
        return res.status(200).redirect('/productos/inventario?msg=Producto eliminado correctamente');

    } catch (error) {
        console.error("Error al eliminar el producto:", error.message);
        return res.status(400).redirect(`/productos/inventario?error=${error.message}`);
    }

};

const getProductUpdate = async (req, res) => {

    const msg = req.query.msg || undefined;
    const error = req.query.error || undefined;
    const { id } = req.params;

    try {

        const product = await Product.find({ _id: id });
        if (!product) {
            return res.status(404).redirect('/productos?error=Producto no encontrado')
        }
        return res.status(200).render('products/productUpdate', { product, msg, error })

    } catch (error) {
        return res.status(404).redirect('/productos?error=Error al acceder a la pagina')
    }


}

const putProductUpdate = async (req, res) => {

    const { id } = req.params;
    const updatedData = req.body;

    try {
        const result = await Product.findByIdAndUpdate({_id: id}, updatedData);
        if (result) {
            return res.status(200).redirect('/productos?msg=Productos actualizado correctamente');
        }

        return res.status(404).redirect('/productos?error=Producto no encontrado');

    } catch (error) {
        return res.status(500).redirect(`/productos?error=Error al actualizar el producto ${error.message}`);
    }
}

module.exports = {
    productCreateGet,
    productCreatePost,
    productsInventoryGet,
    productsGet,
    productDelete,
    getProductUpdate,
    putProductUpdate
}