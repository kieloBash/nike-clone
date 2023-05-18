import { Schema, models, model } from "mongoose";

const TransactionSchema = new Schema({
  itemId: {
    type: String,
    require,
  },
  name: {
    type: String,
    require,
  },
  color: {
    type: String,
    require,
  },
  price: {
    type: Number,
    require,
  },
  size: {
    type: Number,
    require,
  },
  status: {
    type: String,
    require,
  },
  email: {
    type: String,
    require,
  },
});

const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
