const express = require("express")
const app = express()

// PORT
require("dotenv").config()
const PORT = process.env.PORT

// Middlwares

app.use(express.json())

// Filehandling middlware
const fileUpload = require("express-fileupload")
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// DB conect 
const db = require("./database")
db.dbConnect();
//Cloudinary connect

const cloudinary = require("./cloud")
cloudinary.Cloud()

//Routes
const Upload = require("./Routes/FileUpload")
app.use("/api/upload",Upload)

app.listen(PORT,()=>{
    console.log("App is running")
})
app.get("/",(req,res)=>{
    res.send("<h1>Hello this is a fileUpload Class</h1>")
})



