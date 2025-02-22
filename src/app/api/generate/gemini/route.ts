import { env } from "@/env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

        const data = await req.json();
        if (!data.body) {
            return NextResponse.json({ error: "Missing input text." }, { status: 400 });
        }

        console.log("Received prompt:", data.body);

        const result = await model.generateContent(data.body);
        const response = result.response;
        const output = response.text();

        console.log("AI Response:", output);
        return NextResponse.json({ output });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
