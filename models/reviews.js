import { Schema, models, model } from "mongoose";

const ReviewSchema = new Schema({
  reviewId: {
    type: String,
    require,
  },
  itemId: {
    type: String,
    require,
  },
  email: {
    type: String,
    require,
  },
  review: {
    type: String,
    require,
  },
  rating: {
    type: Number,
    require,
  },
  dateReviewed: {
    type: Date,
    // required,
  },
});

const Review = models.Review || model("Review", ReviewSchema);

export default Review;
