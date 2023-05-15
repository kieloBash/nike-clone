import Item from "@/models/item";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()
        const items = await Item.find({category: "Shoes"});
        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 