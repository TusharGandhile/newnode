const express=require('express');
const user = require('../model/user');
const router=express.Router();
const Joi=require('joi');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const verify=require('./verifyToken')
const {userValidation, loginValidation}=require('../validation');

// post user
router.post('/register',async(req,res)=>{
   const error=userValidation(req.body);
   if(error.error)return res.json({message:error.error.details[0].message});

    const userAlreadyExists=await user.findOne({email:req.body.email});
    if(userAlreadyExists)return res.status(400).send("user already exists");

    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt);

const use=new user({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:hashPassword

})
    try{
    const user1=await use.save();
    res.json(user1);
    }catch(err){
    res.send("error"+ err);
    }
    });

//Login
router.post('/login',async(req,res)=>{
     const error=loginValidation(req.body);
     if(error.error)return res.json({message:error.error.details[0].message});

     const isValidUser=await user.findOne({email:req.body.email});
     if(!isValidUser)return res.status(400).send("Invalid Email");

    const validPass=await bcrypt.compare(req.body.password,isValidUser.password);
    if(!validPass)return res.status(400).send("Invalid Password");

    //create jwt token
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRETE);
    res.header('auth-token',token).send(token);



})

// get user by id 
router.get('/register/:id',verify,async(req,res)=>{
    try{
        const saveduser=await user.findById(req.params.id);
        res.json(saveduser);
    }catch(err){
        console.log(err);
    }
})

// get all users

router.get('/register',async(req,res)=>{
    try{
        const savedusers=await user.find();
        res.json(savedusers);
    }catch(err){
        console.log(err);
    }
})

router.patch('/update/:id',verify,async(req,res)=>{
    try{
        const saveduser=await user.findByIdAndUpdate(req.params.id,req.body, { new: true });
        const updateuser=await saveduser.save()
        res.send(updateuser);
      
    }catch(err){
        console.log("error"+err);
    }
});

router.delete('/delete/:id',verify,async(req,res)=>{
    const saveduser=await user.findByIdAndRemove(req.params.id);
    res.send("user deleted !!")

})
module.exports=router;