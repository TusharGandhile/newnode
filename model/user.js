const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:6,
        max:255

    },
    lastName:{
        type:String,
        required:true, 
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
        min:8,
        max:8
    }

})

module.exports=mongoose.model('user',userSchema);