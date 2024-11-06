const File = require("../models/Files");
const cloudinary =require("cloudinary").v2;

// local file upload
exports.localFileUpload= async (req,res)=>{
    try{
        const file= req.files.file;

        const path= __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`
        console.log(path);

        file.mv(path,(err)=>{
            console.log("move krne mein error aya hai");
        });

        res.json({
            success:true,
            messgae:"localFileUpload successful !!",
        });

    }
    catch(error){
        console.log("Error in localFileUpload COntroller !!");
        console.error(err);
    }
}

// image uplaod to cloud and can save it by reducing th equality of the image or not
function supported(filetype,supportedFile){
    return supportedFile.includes(filetype);
}
 async function  upload(file,folder,quality){
    const options={folder};
    options.resource_type="auto";
    if(quality){
        options.quality=quality;
    }
    try {
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } 
    catch (error) {
        console.error("Error uploading to Cloudinary:", error);
       
    }
}
exports.ImageFileUpload = async (req,res)=>{
    try{
        const {name, email, tags}= req.body;
        const file = req.files.imagefile;

        const filetype= file.name.split('.')[1].toLowerCase();
        console.log(filetype);

        const supportedFiles= ["jpg","jpeg","png"];

        if(!supported(filetype,supportedFiles)){
            return res.status(400).json({
                success:false,
                messgae:"file type not supported",
            });
        }

        const response = await upload(file,"FileUpload");
        console.log("cloudinary response",response);

        const fileData= await File.create({
            name,tags,email,
            imageUrl:response.secure_url,
        })
        res.json({
            success:true,
            image_url:response.secure_url,
            message:"image uplaod successful !!",
        })
    }
    catch(err){
        console.log("Error in ImageFileeUpload Controller !!");
        console.error(err);
    }

}

// video upload to cloud with the limitation of size

exports.VideoFileUpload= async (req,res)=>{
    try{
        const {name, email, tags}= req.body;
        const file = req.files.videofile;

        const filetype= file.name.split('.')[1].toLowerCase();
        console.log(filetype);
        console.log(file.size);

        const supportedFiles= ["mp4","mkv"];

        if(!supported(filetype,supportedFiles) || file.size > 4*1024*1024){
            return res.status(400).json({
                success:false,
                messgae:"file type not supported or file is too large",
            });
        }
        console.log("response ke just upar");
        const response = await upload(file,"FileUpload");
        console.log("cloudinary response",response);

        const fileData= await File.create({
            name,tags,email,
            imageUrl:response.secure_url,
        })
        res.json({
            success:true,
            image_url:response.secure_url,
            message:"Video uplaod successful !!",
        })
    }
    catch(err){
        console.log("Error in VideoFileUpload Controller !!");
        console.error(err);
    }
    
}