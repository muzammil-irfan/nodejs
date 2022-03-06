const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/',async(req,res)=>{
    try{
    const products = await Product.find({});
    res.render('productsDisplay',{data:products});
    } catch(err){
        res.status(400).send(err)
    }
})

//Create Post 
router.post('/create',async(req,res)=>{
    try{
        const productCreated = await Product.create(req.body);
        if(!productCreated){
           return  res.send('Try again')
        }
        res.send('Product created successfuly');
    }catch(err){
        res.status(400).send(err)
    }
});

//updateProduct
router.put('/update',async(req,res)=>{
    try{

        const productUpdated = await Product.findOneAndUpdate(req.body);
        if(!productUpdated){
            res.status(400).send('Try again')
        }
        res.send('Product updated successfuly');
    }catch(err){
        res.status(400).send(err)
    }
});

router.delete('/delete',async(req,res)=>{
    try{
        const { title } = req.body;
        const find = await Product.findOne({title})
        if(!find){
            return res.status(404).send('Product Not Found');
        }
        const deleteProduct = await Product.findOneAndDelete({title});
        if(!deleteProduct){
            return res.status(400).send('Try again')
        }
        res.send('Deleted Successfuly')
    } catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router;