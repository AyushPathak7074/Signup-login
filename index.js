const http= require('http');
const express= require('express');
const app= express();
const signupRoute= require('./api/routes/signup')
const userRoute=require('./api/models/signup');
const mongoose=require('mongoose')
const bodyparser = require('body-parser');
const { urlencoded } = require('body-parser');

mongoose.connect('mongodb+srv://Ayush:Babylon420@cluster0.ienqony.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('error',err=>{
    console.log('Connection failed')
})
mongoose.connection.on('connected',connected=>{
    console.log('Connetion Success with database')
})
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/signup',signupRoute);
app.use((req,res,next)=>{
    res.status(200).json(
        {
            message:'code is running'
        } )
})
 const server= http.createServer(app);
 server.listen(3000,console.log('listen success'))

 
