import { connectToDB } from "@/utils/database";
import Order from "@/models/orders";
import User from "@/models/user";

export const POST = async (request) => {
  const {
    orderId,
    items,
    email,
    address,
    specialInstructions,
    amountToPay,
    paymentMethod,
    pickupLocation,
    orderStatus,
    orders,
  } = await request.json();
  try {
    await connectToDB();
    const newOrder = new Order({
      orderId,
      items,
      email,
      address,
      specialInstructions,
      amountToPay,
      paymentMethod,
      pickupLocation,
      orderStatus,
    });

    await newOrder.save();

    const updateUser = await User.findOneAndUpdate(
      { email },
      { orders, address }
    );
    if (updateUser)
      return new Response(JSON.stringify(newOrder), { status: 200 });
    else return new Response("Failed to fetch prompt", { status: 500 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
