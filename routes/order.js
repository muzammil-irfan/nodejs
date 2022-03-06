const express = require('express');
const router = express.Router();
const Order = require('../routes/order');

//Create order 
router.post('/create',async(req,res)=>{
    try{
        const orderCreated = await Order.create(req.body);
        if(!orderCreated){
           return  res.send('Try again')
        }
        res.send('Order created successfuly');
    }catch(err){
        res.status(400).send(err)
    }
});

//updateOrder
router.put('/update',async(req,res)=>{
    try{

        const orderUpdated = await Order.findOneAndUpdate(req.body);
        if(!ordertUpdated){
            res.status(400).send('Try again')
        }
        res.send('Order updated successfuly');
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
});

router.delete('/delete',async(req,res)=>{
    try{
        const { title } = req.body;
        const find = await Order.findOne({title})
        if(!find){
            return res.status(404).send('Order Not Found');
        }
        const deleteOrder = await Order.findOneAndDelete({title});
        if(!deleteOrder){
            return res.status(400).send('Try again')
        }
        res.send('Deleted Successfuly')
    } catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router;