import { connectToDB } from "@/utils/database";
import Transaction from "@/models/transactions";
import User from "@/models/user";

export const POST = async (request, { params }) => {
  const { orders } = await request.json();
  try {
    await connectToDB();
    console.log(orders);
    await Transaction.deleteMany({
      transactionId: { $in: orders },
    });

    return new Response("Delete Successful", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all items error", { status: 500 });
  }
};

export const PUT = async (request) => {
  const { cart, email } = await request.json();
  try {
    await connectToDB();
    const user = await User.findOneAndUpdate({ email }, { cart });
    if (user) {
      return new Response(JSON.stringify(user), { status: 200 });
    } else return new Response(JSON.stringify(null));
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};
