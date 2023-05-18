import { connectToDB } from "@/utils/database";
import Transaction from "@/models/transactions";
import User from "@/models/user";

export const POST = async (request) => {
  const {
    itemId,
    transactionId,
    picture,
    name,
    color,
    price,
    size,
    status,
    email,
  } = await request.json();
  try {
    await connectToDB();
    console.log(name);
    const newTransaction = new Transaction({
      itemId,
      transactionId,
      picture,
      name,
      color,
      price,
      size,
      status,
      email,
    });

    await newTransaction.save();

    return new Response(JSON.stringify(newTransaction), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
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
