import mongoose from "mongoose";

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
    cart: { type: String },
    documents: { type: [String] },
    last_connection: {type: String }
  },
  { versionKey: false }
);
const usersModel = mongoose.model(usersCollection, usersSchema);
export default usersModel;
