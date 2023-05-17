import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (request) => {
  const { email, password } = await request.json();
  try {
    await connectToDB();
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      return new Response(JSON.stringify(user), { status: 200 });
    } else return new Response(JSON.stringify(null));

  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};
