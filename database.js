const mongose = require("mongoose")
require("dotenv").config

exports.dbConnect = ()=>{

    mongose.connect(process.env.DB_URL)
    .then(console.log('db connection success'))
    .catch((error)=>{
        console.log(error)
    })




}
