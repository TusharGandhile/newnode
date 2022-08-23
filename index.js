const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
// const url="mongodb+srv://tushar:tushar@cluster0.xgnf7yi.mongodb.net/test?retryWrites=true&w=majority"
const router=require('./routes/router');

dotenv.config();
mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log("connected to db");
})
app.use(express.json());
app.use('/api/user',router);

app.listen(8000,(req,res)=>{
    console.log("app is running on port 8000");
})