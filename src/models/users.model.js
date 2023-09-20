import mongoose, { Schema } from "mongoose";

const usersCollection = "users";
const usersSchema = mongoose.Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    age: { type: Number, require: true },
    password: { type: String, require: true },
    cart: { type: String },
    role: { type: String, require: true, enum: ["admin", "user", "premium"] },
    cart: {
      type: Schema.Types.ObjectId,
      ref:'carts'
    },
    documents: {
      type: [{
        name: { type: String },
        reference: {type: String}
      }]
    },
    status: {type: Boolean},
    last_connection: {type: String }
  },
  { versionKey: false }
);

usersSchema.pre(/^find/, function (next) {
  this.populate({
    path: "cart",
    select: "products",
    options: { lean: true }
  }).populate({
    path: "cart.products._id",
    select: "title description price"
  });
  next()
})
const usersModel = mongoose.model(usersCollection, usersSchema);
export default usersModel;
