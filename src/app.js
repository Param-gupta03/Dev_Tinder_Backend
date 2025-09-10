const express=require("express");
require("./config/database")
const { adminAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const User =require("./models/user")

const app = express();
app.post("/signup",async (req,res)=>{
    const user = new User({
        fiirstName:"Param",
        lastName:"Gupta",
        emailId:"param123@gmail.com",
        password:"param123",
        age:"21",
    });
    try{
        await user.save();
    res.send("user added successfully!");
    }
    catch(err){
        res.status(400).send("error saving the user :"+ err.massage);
    }
    

});
connectDB()
    .then(()=>{
        console.log("database connection established");
        app.listen(3000,()=>{
        console.log("Server is successfull running")
    });
    })
    .catch((err)=>{
        console.error("database  not connected!!");
    });



app.listen(3000,()=>{
    console.log("Server is successfull running")
});