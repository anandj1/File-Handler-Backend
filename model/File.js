const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
require("dotenv").config()

const FileSchema = new mongoose.Schema({

    name:{

        type:String,
        required:true
    },
    Url:{

        type:String,
        
    },
    tags:{

        type:String,
        
    },
    email:{

        type:String,
        required:true
    }


})
FileSchema.post("save",async function(doc){
    try{
        console.log(doc)

        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },


        })

        let info = await transporter.sendMail({
            from:`Anandz`,
            to:doc.email,
            subject: "New file uploaded !",
            html:`<h2> Hello There!</h2><p>File Uploaded</p><br><span>Here is the link  :  </span><a href = "${doc.Url}">${doc.Url}</a>`


        })
        console.log("Info =>",info)


    
    }
    catch(err){
        console.error(err)
    }

})



module.exports = mongoose.model("File",FileSchema)