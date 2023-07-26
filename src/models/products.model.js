import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: false },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: [String] },
  owner: {
    type: String,
    default: "admin",
  },
},
{ versionKey: false });

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;
