import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
  userId: {
    type: String
  },
  products: {
    type: [
      {
        _id: {
          type: String
        },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  }
}, { versionKey: false});


const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
