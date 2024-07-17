const express = require("express")
const router = express.Router()

const{imageUpload,videoUpload, localUpload,imageReduce} = require("../controllers/fileUpload")


// router.post("/imageUpload",imageUpload)
router.post("/localUpload",localUpload)
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)
router.post("/imageReduce",imageReduce)




module.exports = router;

