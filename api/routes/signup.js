 const express= require('express');
const app= express();
const router= express.Router();
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const signup = require('../models/signup');
router.post('/',(req,res,next)=>{
     bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err,
            })
        }
        else{
            const user= new signup({
                _id:new mongoose.Types.ObjectId,
                username: req.body.username,
                email: req.body.email,
                password: hash 
            })
            user.save()
            .then(result=>{
                console.log(result);
                res.status(200).json({
                    new_user: result 
                })
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
            })
        }
     })// console.log(req.body);
})
router.post('/login',(req,res,next)=>{
    signup.find({username:req.body.username})
    .exec()
    .then(user=>
        {
            if(user.length<1)
            {
                return res.status(500).json({
                    message:"No User Found"
                })
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(!result)
                {
                    res.status(401).json({
                        msg:"Incorrect password",
                       
                    })
                    console.log(req.body.password);
                    console.log('Login failed');
                }
                if(result){
                    res.status(200).json({
                        msg:"Login Success"
                    })
                    console.log('login success');

                }
            })
        })
})
module.exports= router;
