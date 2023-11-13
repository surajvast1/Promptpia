import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req)=>{
    try{
        await connectToDB();
        
        const prompts = await Prompt.find({}).populate('creator');
        console.log("successuful")
        return new Response(JSON.stringify(prompts),{status : 200});
        
    }
    catch(err){
        console.log("Failed")
        return new Response("Failed to fetch all prompts",{status : 500});
    }   
}