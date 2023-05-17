import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (request) => {
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
  } = await request.json();
  try {
    await connectToDB();
    const newUser = new User({
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
