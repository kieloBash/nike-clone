import { connectToDB } from "@/utils/database";
// import Item from "@/models/item";
// import Items from "@/models/items";
import Item from "@/models/item";

export const POST = async (request) => {
  const {
    category,
    productDetails,
    description,
    price,
    name,
    colorways,
    benefits,
    sizes,
    gender,
    usage,
    reviews,
  } = await request.json();
  try {
    await connectToDB();
    const newItem = new Item({
      category,
      productDetails,
      description,
      price,
      name,
      colorways,
      benefits,
      sizes,
      gender,
      usage,
      reviews,
    });

    await newItem.save();

    return new Response(JSON.stringify(newItem), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
