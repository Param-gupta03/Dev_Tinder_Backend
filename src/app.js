const express=require("express");
const { adminAuth } = require("./middlewares/auth");

const app = express();




app.get("/user/:userId",(req,res)=>{
    console.log(req.params); 
    res.send({firstName:"Param",lastName:"Gupta"});
});
// app.post("/hello",(req,res)=>{
//     res.send("hello ji")
// })
// app.delete("/hello",(req,res)=>{
//     res.send("hello delete");
// })
// app.use("/",(req,res)=>{
//     res.send("Hello from the server!");
// });
// app.get("/test",(req,res,next)=>{
//     console.log("hello");
//     next();
// },
// (req,res)=>
// {
//     console.log("hello2");
//     res.send("hello hello");
// }
// )


app.use("/admin",adminAuth);


app.use("/admin/alluserdata",(req,res)=>
{
    res.send("all user data sended");
});
app.use("/admin/delete",(req,res)=>{
    res.send("delete user");
});

app.use("/",(err,req,res,next)=>{
    if(err)
    {
        res.status(500).send("something went worng");
    }
})



app.listen(3000,()=>{
    console.log("Server is successfull running")
});