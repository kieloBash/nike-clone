import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  name: { //
    type: String,
    require,
  },
});

const Items = models.Items || model("Items", ItemSchema);
export default Items;
