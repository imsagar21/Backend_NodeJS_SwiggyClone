 const express = require("express")
 const path = require("path")
 const FirmControllers = require("../controllers/FirmControllers")
 const TokenVerify = require("../middleware/TokenVerify")

 const router = express.Router()

 router.post("/add-firm",TokenVerify,FirmControllers.addFirm)
  router.get("/uploads/imageName",(req,res)=>{
     const imageName = req.params.imageName
     res.headersSent("content-Type","image/jpeg")
     res.sendFile(path.join(__dirname,"..","uploads",imageName))
  });
  router.delete("/:firmId",FirmControllers.deleteFirmById)

 module.exports=router