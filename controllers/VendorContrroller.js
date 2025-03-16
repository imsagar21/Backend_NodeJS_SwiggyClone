const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv")
dotEnv.config()
const secretKey = process.env.SECRET_KEY

const VendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const VendorEmail = await Vendor.findOne({ email });
    if (VendorEmail) {
      res.status(400).json("Email already Taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });
    await newVendor.save();
    res.status(201).json({ message: "Vendor Registered Successfully" });
    console.log("registered");
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal Server error" });
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });

    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      res.status(401).json({ error: "invalid credentials" });
    }
    const token = jwt.sign({vendorId: vendor._id},secretKey,{expiresIn:"1hr"})
    res.status(200).json({ success: "Login Successfull",token });
    console.log(email , token);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"Internal servor error"})
  }
};

const getAllVendors = async (req,res) =>{
  try {
    const vendors = await Vendor.find().populate("firm")
    res.json({vendors})
  } catch (error) {
    console.error(error)
    res.status(500).json({error:"Internal server error"})
  }
}

const getSingleVendor= async(req,res)=>{
  const vendorId = await req.params.id
  try {
    const vendor = await Vendor.findById(vendorId)
    if(!vendor){
      return res.status(404).json({error:"Vendor not found"})
    }
    res.status(200).json({vendor})
  } catch (error) {
    console.error(error)
    res.status(500).json({Error:"Inrernal server error"})
  }
}

module.exports = { VendorRegister,vendorLogin,getAllVendors,getSingleVendor};
