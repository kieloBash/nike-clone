import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const PUT = async (request) => {
  const { favorites, email } = await request.json();
  try {
    await connectToDB();
    const user = await User.findOneAndUpdate({ email }, { favorites });
    if (user) {
      return new Response(JSON.stringify(user), { status: 200 });
    } else return new Response(JSON.stringify(null));
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};
