const File =require("../model/File")
const cloudinary = require("cloudinary").v2

exports.localUpload = async (req,res)=>{
    try{

        const file = req.files.file
        console.log("current file =>",file)

        let path = __dirname + "/files/" + Date.now() % 1000 + `.${file.name.split('.')[1]}`  
        console.log(path)
        file.mv(path, (err)=>{
            console.log(err)
            


        })
        res.json({
            success:true,
            message:"File Uploaded Successfully"
        })




    }catch(error){
        res.json({
            success:false,
            message:error
        })

    }
}
function isFileSupported(type,supported){
    return supported.includes(type)
}

async function uploadFile(file,folder,quality){
    const options = {folder}
    options.resource_type = "auto"
    if(quality){
        options.quality = quality
       
       

       }

   return await cloudinary.uploader.upload(file.tempFilePath,options)
   
  


}

exports.imageUpload = async (req,res)=>{

    try{

        const{name,tags,email} = req.body
        console.log(name,tags,email);

        const file = req.files.file
        console.log(file)

        const supported = ["jpg","jpeg","png"]
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileSupported(fileType,supported)){
            return res.status(400).json({
                success:"false",
                message:"file formatted not supported"

            })

        }

        const response = await uploadFile(file,"Data_Anand")
        console.log(response)

        // DB entry 

        const fileData = await File.create({
            name,email,tags,
            Url : response.url
        })

        res.json({
            success:true,
            Url : response.url,
            message:"Image Upload Successful"
        })

         
    }catch(error){
        res.json({
            success:false,
            message:"Upload Failed",
            error: error
            
        })

    }

}

exports.videoUpload = async(req,res)=>{

    try{
        const {name,tags,email } = req.body
        console.log(name,tags,email)

        const file = req.files.file
        console.log(file)
        const fileType = file.name.split(".")[1].toLowerCase()
        const supported = ["mp4","mov","gif"]



        if(!isFileSupported(fileType,supported) || (file.size > 10000000) ){
            return res.status(400).json({
                success:"false",
                message:"file formatted not supported or file too large (10mb is max size)"

            })

        }
        const response = await uploadFile(file,"Data_Anand")
        console.log(response)

        // Uploading to db

        const fileData = await File.create({
            name,email,tags,
            Url : response.url
        })

        res.json({
            success:true,
            Url : response.url,
            message:"Video Upload Successful"
        })


      




    } catch(err){
        res.json({
            success:false,
            message : err

        })
    }
}



exports.imageReduce = async (req,res)=>{

    try{

        const{name,tags,email} = req.body
        console.log(name,tags,email);

        const file = req.files.file
        console.log(file)

        const supported = ["jpg","jpeg","png"]
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileSupported(fileType,supported)){
            return res.status(400).json({
                success:"false",
                message:"file formatted not supported"

            })

        }

        const response = await uploadFile(file,"Data_Anand",40)
        console.log(response)

        // DB entry 

        const fileData = await File.create({
            name,email,tags,
            Url : response.url
        })

        res.json({
            success:true,
            Url : response.url,
            message:"Image Upload Successful"
        })

         
    }catch(error){
        res.json({
            success:false,
            message:"Upload Failed",
            error: error
            
        })

    }

}









