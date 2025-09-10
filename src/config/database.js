const mongoose=require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://param:param123@cluster0.b0eu6.mongodb.net/devTinder"

    )};

    module.exports={connectDB}

    connectDB()
    .then(()=>{
        console.log("database connection established");
    })
    .catch((err)=>{
        console.error("database  not connected!!");
    });