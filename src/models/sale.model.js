const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    products: [
        {
            idProduct: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
            productName: { type: String, required: true},
            quantity: { type: Number, required: true },
            unitPrice: { type: Number, required: true },
        }
    ],
    status: { type: String, required: true, enum: ["normal", "modificado", "cancelada"], default: "normal" },
    seller: { type: String, required: true, default: "JuanSQ"},
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = { Sale };