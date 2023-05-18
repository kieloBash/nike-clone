import Review from "@/models/reviews";
import { connectToDB } from "@/utils/database";

export const POST = async (request, { params }) => {
  const { reviews } = await request.json();
  try {
    await connectToDB();
    console.log(reviews);
    const reviewsNew = await Review.find({ reviewId: { $in: reviews } });

    if (reviewsNew) return new Response(JSON.stringify(reviewsNew), { status: 200 });
    else return new Response("Failed to fetch all items", { status: 500 });
  } catch (error) {
    return new Response("Failed to fetch all items error", { status: 500 });
  }
};
