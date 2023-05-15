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
  name: { //
    type: String,
    require,
  },
  pictures: {
    type: [String],
  },
  colorways: { //
    type: [String],
    require: [true, "Name of item is require!"],
  },
  price: { //
    type: Number,
    require,
  },
  sizes: { //
    type: [Number],
    require,
  },
  description: { //
    type: String,
    require,
  },
  category: { //
    type: String,
    require,
  },
  benefits: { //
    type: [String],
    require,
  },
  productDetails: { //
    type: String,
    require,
  },
  reviews: { //
    type: [String],
  },
  gender: { //
    type: {
      Men: {
        type: Boolean,
      },
      Women: {
        type: Boolean,
      },
      Unisex: {
        type: Boolean,
      },
      Kids: {
        type: Boolean,
      },
    },
    require,
  },
  usage: { //
    type: {
      Lifestyle: {
        type: Boolean,
      },
      Basketball: {
        type: Boolean,
      },
      Volleyball: {
        type: Boolean,
      },
      Soccer: {
        type: Boolean,
      },
      Football: {
        type: Boolean,
      },
      Running: {
        type: Boolean,
      },
    },
    require,
  },
});

const Item = models.Item || model("Item", ItemSchema);

export default Item;
