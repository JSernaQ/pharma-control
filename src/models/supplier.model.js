const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    contactEmail: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contactPhone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String, 
        required: true
    },
    productsSupplied: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

supplierSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = {Supplier};
