const express=require("express");

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
app.get("/test",(req,res,next)=>{
    console.log("hello");
    next();
},
(req,res)=>
{
    console.log("hello2");
    res.send("hello hello");
}
)


app.listen(3000,()=>{
    console.log("Server is successfull running")
});