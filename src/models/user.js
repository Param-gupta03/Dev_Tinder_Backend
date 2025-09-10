const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    fiirstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
    },
    password:{
        type:String,
    },
    age:{
        type: String,   
    }
});
module.exports=mongoose.model("User",userSchema);