const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        validate: {
            validator: val=> val < 6
        },
        message:'Value cannot be bigger than 5'
    },
    comment:String,

});

const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;