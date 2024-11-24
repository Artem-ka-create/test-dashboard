import { connectDB } from "@/app/database";
import Test from "@/models/Test";

import { request } from "http";


export const GET = async (request: any) => {
    try{
        await connectDB();

        const tests = await Test.find({}).populate('creator')
        console.log('gotten tests from db->', tests);
        

        return new Response(JSON.stringify(tests), {status:200})
    }catch(error){
        return new Response("Failed to fetch all tests", { status: 500 })
    }
}