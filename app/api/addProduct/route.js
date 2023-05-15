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
    pictures
    
  } = await request.json();

  // const body = await request.json();

  // console.log(body);

  // console.log(pictures)
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
      pictures
    });

    await newItem.save();

    return new Response(JSON.stringify(newItem), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
