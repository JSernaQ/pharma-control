const { Sale } =require("../../models/sale.model");

const saleHistoryGet = async (req, res) => {
    const msg = req.query.msg || undefined
    const error = req.query.error || undefined

    try {
        const allSales = await Sale.find();
        res.render('sales/saleHistory', { sales: allSales, msg, error });
    } catch (error) {
        console.error('Error al obtener productos y clientes:', error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = {
    saleHistoryGet
};