import Transaction from "@/models/transactions";
import { connectToDB } from "@/utils/database";

export const POST = async (request, { params }) => {
  const { email } = await request.json();
  try {
    await connectToDB();
    const transactions = await Transaction.find({ email });

    return new Response(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all items error", { status: 500 });
  }
};
