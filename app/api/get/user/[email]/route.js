import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const email = `${params.email}`;
    const userExists = await User.findOne({ email });

    if (userExists)
      return new Response(JSON.stringify(userExists), { status: 200 });
    else return new Response("Failed to fetch all prompts", { status: 500 });
    
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
