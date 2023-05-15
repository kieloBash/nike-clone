import { Schema, models, model } from "mongoose";

function generateRandomId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

const ItemSchema = new Schema({
  itemId: {
    type: String,
    default: generateRandomId(),
  },
  name: {
    type: String,
    required,
  },
  pic: {
    type: [String],
  },
  colorways: {
    type: [[String]],
    required: [true, "Name of item is required!"],
  },
  price: {
    type: Number,
    required,
  },
  sizes: {
    type: [Number],
    required,
  },
  description: {
    type: String,
    required,
  },
  benefits: {
    type: [String],
    required,
  },
  productDetails: {
    type: [String],
    required,
  },
  reviews: {
    type: String,
    required,
  },
  gender: {
    type: [String],
    required,
  },
  usage: {
    type: [String],
    required,
  },
});

const Items = models.Items || model("Items", ItemSchema);

export default Items;
