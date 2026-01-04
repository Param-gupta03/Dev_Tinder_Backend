const express=require("express");
require("./config/database")
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const http=require("http");
require('dotenv').config()
const app = express();


app.use(cors(
    {
        origin: process.env.FRONTEND_CALL || "*",
        credentials:true,
    }
));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");



app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",chatRouter);

const server = http.createServer(app);
initializeSocket(server);


connectDB()
    .then(()=>{
        console.log("database connection established");
        server.listen(3000,()=>{
        console.log("Server is successfull running")
    });
    })
    .catch((err)=>{
        console.error("database  not connected!!");
    });