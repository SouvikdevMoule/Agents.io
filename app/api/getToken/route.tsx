import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

const assemblyai = new AssemblyAI({apiKey: process.env.ASSEMBLY_API_KEY as any});
export async function GET(req: Request) {
    const token = await assemblyai.realtime.createTemporaryToken({
        expires_in: 3600, // Token expiration time in seconds (optional, default is 3600 seconds)
    })
    return NextResponse.json(token)
}
