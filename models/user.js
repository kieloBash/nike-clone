import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    require,
  },
  password: {
    type: String,
    require,
  },
  firstName: {
    type: String,
    require,
  },
  lastName: {
    type: String,
    require,
  },
  dateOfBirth: {
    type: Date,
  },
  favorites: {
    type: [String],
    default: [],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
