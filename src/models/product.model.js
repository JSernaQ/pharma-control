const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    barCode : { type:String, unique:true},
    productName : { type : String, required : true, unique:true},
    productDescription : String,
    price : { type: Number, required: true},
    stock : { type : Number, default : 0 },
    minStock : { type : Number, default : 0 },
    inputs : { type : Number, default: 0 },
    outputs : { type : Number, default: 0 },
    supplier : String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = {Product};