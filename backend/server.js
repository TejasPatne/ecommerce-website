const app = require('./app');
const cloudinary = require('cloudinary');
const connectDatabase = require('./config/database');

//Handling Uncaught Exception
process.on("uncaughtException",()=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "/config/config.env" });
}

//connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on https://localhost:${process.env.PORT}`);
})

//Unhandles Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    });
})