const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("db connection successful !!");
    }).catch((err)=>{
        console.log("Mongo DB mein error hai");
        console.error(err);
    })
}