const express = require('express')
const app = express();
const port = 4000;
const session = require('express-session');
const bodyParser = require('body-parser');
const { mongoose } = require('./db');
const auth = require('./routes/auth');
const product = require('./routes/product');
const order = require('./routes/order');
const {authMiddleware} = require('./middleware/auth');
const {adminMiddleware} = require('./middleware/auth');
const path = require('path');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(express.static(path.join(__dirname,"assets")))

app.set("view engine", "ejs");
app.set("views", "views");

app.use('/',auth);

app.get("/app/welcome",(req,res)=>{
    res.render("welcome");
})
//auth middleware
// app.use('/',authMiddleware);
// app.use('/',adminMiddleware)
app.use('/product',product);
// app.use('/order',order)


app.all('*',(req,res)=>{
    res.render('404');
})

app.listen(port,()=>{
    console.log('Mubarak! Server chal raha hai');
}); 