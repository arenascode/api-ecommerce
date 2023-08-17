import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = mongoose.Schema({
  code: { type: String },
  purchase_dateTime: { type: String },
  amount: { type: Number },
  purchaser: {type: String}
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema)
