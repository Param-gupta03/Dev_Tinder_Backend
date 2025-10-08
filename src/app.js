const express=require("express");
require("./config/database")
const { adminAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const User =require("./models/user");
const { object } = require("zod");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt")

const app = express();
app.use(express.json());
app.post("/signup",async (req,res)=>{
    
    
    try{
        validateSignUpData(req);
        const {firstName,lastName,emailId,password}=req.body;
        const passwordHash= await bcrypt.hash(password,10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();
        res.send("user added successfully!");
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
    

});


app.post("/login",async (req,res)=>{
    
    
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid= await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            res.send("Login Successfull !!")
        }
        else{
            throw new Error("Invalid credentails");
            
        }
    
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
    

});

app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const user = await User.findOne({emailId:userEmail});
        if(user.length === 0){
            res.status(400).send("user not found");
        }
        else{
        res.send(user);
        }
        }
    catch(err){
        res.status(400).send("something went worng");
    }
})

app.get("/feed",async(req,res)=>{
    try{
        const user = await User.find({});
        if(user.length === 0){
            res.status(400).send("user not found");
        }
        else{
        res.send(user);
        }
        }
    catch(err){
        res.status(400).send("something went worng");
    }
})

app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted ")
    }
     catch(err){
        res.status(400).send("something went worng");
    }
})

app.patch("/user/:userId",async(req,res)=>{
    const userId= req.params?.userId;
    const data=req.body;
    try{
        const ALLOWED_UPDATES = ["userId","photoUrl","about","skills","age"];
        const isUpataAllowed=Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
    );
    if(!isUpataAllowed){
        res.status(400).send("updata not allowed");
    }
    if(data?.skills.length >10){
        throw new Error("Skills cannot be more then 10");
    }

     const user =  await User.findByIdAndUpdate({_id: userId},data,{
            returnDocument: "after",
            runValidators: true,
        });
        res.send("user updata")
    }
     catch(err){
        res.status(400).send("updata failed" + err.massage);
    }
})


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