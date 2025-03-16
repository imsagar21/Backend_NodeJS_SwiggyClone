
const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const VendorRoutes = require("./routes/VendorRoutes")
const FirmRoutes = require("./routes/FirmRoutes")
const productRoutes=require("./routes/ProductRoutes")
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 4000;
dotEnv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoDB connected Sucessfully"))
  .catch((error) => console.log(error));
app.listen(PORT, () => {
  console.log(`server running successfully at ${PORT}`);
});
app.use(bodyParser.json())
app.use("/vendor",VendorRoutes)
app.use("/firm",FirmRoutes)
app.use("/products",productRoutes)
app.use('/uploads',express.static('uploads'))
app.use("/", (req, res) => {
  res.send("<h1>Welcome to swiggy");
});
