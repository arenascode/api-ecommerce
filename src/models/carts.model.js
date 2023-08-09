import mongoose, { Schema } from "mongoose";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
  user: {
    type: String
  },
  products: {
    type: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "products"
        },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  }
}, { versionKey: false});

cartsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products._id",
    select: "title description price category",
    options: { lean: true },
  });
  next()
})
const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;