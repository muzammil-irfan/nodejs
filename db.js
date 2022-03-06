const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/nodejstest',(err,res)=>{
    if(err){
       return console.log({err});
    }
    console.log('Mongodb Connected');
});
