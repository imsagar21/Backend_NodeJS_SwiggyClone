const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required:true
  },
  price: {
    type: String,
    required:true
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  category: [
    {
        type:String,
        enum:["veg","non-veg"]
    }
  ],
  bestSeller: {
    type: String
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm"
    },
  ],
});
const Product = mongoose.model("product", productSchema);

module.exports = Product;
