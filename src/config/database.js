const mongoose=require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(process.env.DB_CONNECTION

    )};

    module.exports={connectDB}

    connectDB()
    .then(()=>{
        console.log("database connection established");
    })
    .catch((err)=>{
        console.error("database  not connected!!");
    });