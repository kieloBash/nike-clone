import { connectToDB } from "@/utils/database";
import Review from "@/models/reviews";
import User from "@/models/user";
import Item from "@/models/item";

export const POST = async (request) => {
  const { reviewId, itemId, email, review, rating, dateReviewed } =
    await request.json();
  try {
    await connectToDB();
    console.log(reviewId);
    const newReview = new Review({
      reviewId,
      itemId,
      email,
      review,
      rating,
      dateReviewed,
    });

    await newReview.save();

    return new Response(JSON.stringify(newReview), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

export const PUT = async (request) => {
  const { reviewsItem, reviewsUser, email, _id } = await request.json();
  try {
    await connectToDB();
    const updateUser = await User.findOneAndUpdate(
      { email },
      { reviews: reviewsUser }
    );

    const updateItem = await Item.findOneAndUpdate(
      { _id },
      { reviews: reviewsItem }
    );

    if (updateUser && updateItem) {
      return new Response(JSON.stringify(updateItem), { status: 200 });
    } else return new Response(JSON.stringify(null));
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};
