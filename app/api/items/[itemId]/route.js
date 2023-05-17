import Item from "@/models/item";
import { connectToDB } from "@/utils/database";

export const GET = async (request, {params}) => {
    try {
        await connectToDB()
        const item = await Item.findOne({itemId: params.itemId});
        // console.log(params.category)
        return new Response(JSON.stringify(item), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 