import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        console.log("reached")
        const { searchParams } = new URL(req.url);
        const jobTitle = searchParams.get("title");
        const location = searchParams.get("location");
        console.log("Searching for jobs:", jobTitle, location);
        if (!jobTitle) {
            return NextResponse.json({ error: "Missing job title." }, { status: 400 });
        }

        const formattedQuery = `${jobTitle} in ${location}`.trim();
        const response = await fetch(`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(formattedQuery)}`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string, // Ensure you have this in .env
                "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
            },
        });

        if (!response.ok) {
            throw new Error(`JSearch API Error: ${response.statusText}`);
        }

        const result = await response.json();
        return NextResponse.json({ jobs: result.data || [] });
    } catch (error) {
        console.error("JSearch API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
