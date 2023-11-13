import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// get

                export const GET = async (req,{params})=>{
                    try{
                        await connectToDB();
                        const prompt = await Prompt.findById(params.id).populate('creator');
                        if(!prompt) return new Response("Prompt not found",{status: 404})
                        return new Response(JSON.stringify(prompt),{status : 200});
                    }
                    catch(err){
                        console.log("Failed")
                        return new Response("Failed to fetch all prompts",{status : 500});
                    }   
                }
//patch
                export const PATCH = async (req,{params})=>{

                    const {prompt,tag} = await req.json();
                    try{
                        await connectToDB();

                        const existingPrompt = await Prompt.findById(params.id).populate('creator');
                        if(!prompt) return new Response("Prompt not found",{status: 404})

                        existingPrompt.prompt = prompt;
                        existingPrompt.tag = tag;

                        await existingPrompt.save();
                        return new Response(JSON.stringify(prompt),{status : 200});
                    }
                    catch(err){
                        console.log("Failed")
                        return new Response("Failed to update all prompts",{status : 500});
                    }   
                }


//delete

        export const DELETE = async (req,{params})=>{
            try{
                await connectToDB();
                await Prompt.findByIdAndRemove(params.id);

                return new Response("Prompt deleted successfully",{status : 200});
            }
            catch(err){
                console.log("Failed to Delete prompts")
                return new Response("Failed to Delete prompts all prompts",{status : 500});
            }   
        }
