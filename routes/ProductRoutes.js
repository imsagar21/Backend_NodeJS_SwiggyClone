 
 const productController = require("../controllers/ProductController")
 const express = require("express")
 const router = express.Router()
 const path = require("path")

 router.post("/add-product/:firmId",productController.addProduct)
 router.get("/:firmId/products",productController.getProductByFirmId)
 router.get("/uploads/:imageName",(req,res)=>{
    const imageName = req.params.imageName
    res.headersSent("content-Type","image/jpeg")
    res.sendFile(path.join(__dirname,"..","uploads",imageName))
 });
 router.delete("/:productId",productController.deleteProductById)

 module.exports=router