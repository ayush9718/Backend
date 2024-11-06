// app bnaliya
const express = require("express");
const app = express();

// port nikalna hai
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// middleware call kre hai
app.use(express.json());
const fileupload= require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

// routes import
const upload=require("./routes/FileUpload");
app.use("/upload",upload);

// db connection
const database = require("./config/Database");
database.connect();

// cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// serever starting
app.listen(PORT,
    ()=>{
        console.log(`server connected at ${PORT}`);
    }
)
