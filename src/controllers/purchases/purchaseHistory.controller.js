const { Purchase } = require('../../models/purchase.model');

const purchaseHistoryGet = async (req, res) => {
    const msg = req.query.msg || undefined
    const error = req.query.error || undefined

    try {
        const allpurchases = await Purchase.find();
        res.render('purchases/purchasesHistory', { purchases: allpurchases, msg, error });
    } catch (error) {
        console.error('Error al obtener productos y clientes:', error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    purchaseHistoryGet
};