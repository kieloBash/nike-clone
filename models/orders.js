import { Schema, models, model } from "mongoose";

const OrderSchema = new Schema({
  orderId: {
    type: String,
    require,
  },
  items: {
    type: [String],
    require,
  },

  email: {
    type: String,
    require,
  },
  address: {
    type: String,
  },
  specialInstructions: {
    type: String,
  },

  amountToPay: {
    type: Number,
    require,
  },
  paymentMethod: {
    type: String,
    require,
  },
  pickupLocation: {
    type: String,
  },

  orderStatus: {
    type: String,
    require,
  },
  orderDate: {
    type: Date,
    default: Date.now,
    // required,
  },
  lastReviewed: {
    type: Date,
    default: Date.now,
    // required,
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
