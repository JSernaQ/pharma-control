const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    products: [
        {
            product: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            unitPrice: { type: Number, required: true },
        }
    ],
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = { Sale };