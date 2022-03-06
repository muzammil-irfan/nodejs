const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register',async(req,res)=>{
    try{
    const {email} = req.body;
    const emailVerification = await User.findOne({email});
    if(emailVerification){
        return res.status(200).send('Email already exist');
    }
    req.body.password = bcrypt.hashSync(req.body.password);
    const user = await User.create(req.body);
    res.status(200).send(user);
    } catch (err){
        res.status(400).json({err});
    }
})

router.post('/login',async(req,res)=>{
    try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(200).send('Please enter correct credentials');
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(200).send('Please enter correct credentials');
    }
    req.session.user = user.email;
    res.send('Logged in successfuly');
    } catch(err){
        res.send(err);
    }
 })

module.exports = router;