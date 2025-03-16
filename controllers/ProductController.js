const Firm = require("../models/Firm");
const multer = require("multer");
const Product = require("../models/Product");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage: storage }); // Create an upload instance

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, description, bestseller } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const firmId = await req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ error: "Firm not found" });
    }
    const product = new Product({
      productName,
      price,
      category,
      bestseller,
      image,
      description,
      firm: firm._id,
    });
    const savedProduct = await product.save();
    firm.products.push(savedProduct);
    await firm.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};
const getProductByFirmId = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ Error: "Firm not Found" });
    }
    const restaurantName = Firm.firmName;
    const products = await Product.find({ firm: firmId });
    res.json({ restaurantName, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server issue" });
  }
};
const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server issue" });
  }
};

module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductByFirmId,deleteProductById
};
