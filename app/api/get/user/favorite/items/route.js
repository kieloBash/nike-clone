import Item from "@/models/item";
import { connectToDB } from "@/utils/database";

export const POST = async (request, { params }) => {
  const { favorites } = await request.json();
  try {
    await connectToDB();
    console.log(favorites);
    // const query = { fieldToMatch: { $in: favorites } };
    const items = await Item.find({ _id: { $in: favorites } })

    if (items)
      return new Response(JSON.stringify(items), { status: 200 });
    else return new Response("Failed to fetch all items", { status: 500 });
  } catch (error) {
    return new Response("Failed to fetch all items error", { status: 500 });
  }
};
