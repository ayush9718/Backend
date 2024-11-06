const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fileSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    },
});

fileSchema.post("save",async function(docs){
    try{
        // transporter function
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        // sending mail 
        let info = await transporter.sendMail({
            from:"Ayush Kumar",
            to:docs.email,
            subject:"apka data save kr liya hai humne bhai",
            html:`<h2>hello world babes</h2>`,
        });

    }
    catch(err){
        console.log("error aya hai bhai mail sending mein");
        console.error(err);
    }
})

module.exports=mongoose.model("File",fileSchema);