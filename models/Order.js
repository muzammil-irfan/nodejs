const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products:
        // {
        //     type:mongoose.Types.ObjectId,
        //     ref:"Product"
        // }
        type:String
    ,
    amount : Number
        // validate:{
        //     validator:(val)=>{
        //         val > 0
        //     }
        // },
        // message:"Amount cannot be zero"
    
});

const Order = mongoose.model('Order',OrderSchema);

module.exports = Order;
