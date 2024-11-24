import { connectDB } from "@/app/database";
import Test from "@/models/Test";

export const POST = async (request: { json: () => Promise<{ userId: string; name: string; projectName: string; url: string; csvData: string; done: boolean }> }) => {
    try {
        const { userId, name, projectName, url, csvData, done } = await request.json();

        // Connect to the database
        await connectDB();

        // Validate required fields
        if (!userId || !name || !projectName || !csvData) {
            return new Response(
                JSON.stringify({ error: "Missing required fields: userId, name, projectName, or csvData." }),
                { status: 400 }
            );
        }

        const newTest = new Test({
            creator: userId,
            name,
            projectName,
            url: url || null, // URL is optional
            csvData,
            done: done || false,
            date: new Date // Default to false if not provided
        });

        console.log("Creating new test:", newTest);

        // Save the new test to the database
        await newTest.save();


        await fetch("http://127.0.0.1:8000/new-test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId,
                name,
                projectName,
                url,
                csvData,
                done
            }),
        });

        

        return new Response(JSON.stringify(newTest), { status: 201 });
    } catch (error) {
        console.error("Error creating test:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create a new test. Please try again later." }),
            { status: 500 }
        );
    }
};
