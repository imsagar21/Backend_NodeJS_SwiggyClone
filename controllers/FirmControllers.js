const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const path = require("path")
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage: storage }); // Create an upload instance

const addFirm = async (req, res) => { 
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      console.error(error)
      return res.status(404).json({ message: "Vendor not found" });
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });
    const savedFirm = await firm.save();
    vendor.firm.push(savedFirm)
    await vendor.save()
    return res.status(200).json({ message: "Firm added successfully" });
  } catch (error) {
    console.error(error) 
    res.status(500).json({ error: "Internal server issue" });
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const deleteFirm = await Product.findByIdAndDelete(firmId);
    if (!deleteFirm) {
      return res.status(404).json({ error: "Firm not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server issue" });
  }
};

module.exports = { addFirm: [upload.single('image'), addFirm],deleteFirmById };
