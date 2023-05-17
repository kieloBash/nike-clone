import Item from "@/models/item";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const genderObject = `${params.category}`;
    const items = await Item.find({ genderCategory: genderObject });
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
