const express=require("express");
require("./config/database")
const { adminAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");
const User =require("./models/user")


const app = express();
app.use(express.json());
app.post("/signup",async (req,res)=>{
    
    const user = new User(req.body);
    try{
        await user.save();
    res.send("user added successfully!");
    }
    catch(err){
        res.status(400).send("error saving the user :"+ err.massage);
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

app.patch("/user",async(req,res)=>{
    const userId= req.body.userId;
    const data=req.body;
    try{
        await User.findByIdAndUpdate({_id: userId},data);
        res.send("user updata")
    }
     catch(err){
        res.status(400).send("something went worng");
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