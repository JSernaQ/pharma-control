const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    date : { type : Date, default : Date.now },
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer',
        default: 'ID_DEL_CLIENTE_FINAL' 
    },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            unitPrice: { type: Number, required: true },
        }
    ],
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = {Sale};