
import { connectDB } from "@/app/database";
import Test from "@/models/Test";



export const POST = async (request: { json: () => PromiseLike<{ userId: any; url: any; csvData: any; done: any; }> | { userId: any; url: any; csvData: any; done: any; }; }) => {
    try {
        const { userId, url, csvData, done } = await request.json();
        
        await connectDB();

        // Ensure all necessary fields are included
        const newTest = new Test({ creator: userId, url, csvData, done });
        
        console.log(newTest);

        await newTest.save();
        return new Response(JSON.stringify(newTest), { status: 201 });
    } catch (error) {
        console.error("Error creating test:", error); // Log the actual error
        return new Response("Failed to create a new test", { status: 500 });
    }
};