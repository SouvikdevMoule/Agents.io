
import axios from 'axios';
import OpenAI from "openai"
import { Expertlist } from './Option';
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
// export const getToken = async () => {
//     const result = await axios.get('/api/getToken'); 
//     return result.data
// }  
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.NEXT_PUBLIC_API_KEY_REF as any,
    dangerouslyAllowBrowser: true,
    
  }) 

  export const AiModel = async ({topic, coachingoption, text}: any) => {
    try {
        const option = Expertlist.find((item) => item.name === coachingoption);
        if (!option) throw new Error("Invalid coaching option");

        const PROMPT = option.PROMPT.replace("{user_topic}", topic);
        
        // Try with a more reliable model first
        const completion = await openai.chat.completions.create({
            model: "anthropic/claude-3-haiku", // More reliable alternative
            messages: [
                {role: "assistant", content: PROMPT},
                {role: "user", content: text}
            ],
        });

        return completion.choices[0]?.message?.content || "No response from AI";
        
    } catch (error) {
        console.error("AI Model Error:", error);
        return "Sorry, I couldn't process that request.";
    }
}

export const AiGeneratedFeedbackAndNotes = async ({coachingoption, conversation}: any) => {
    try {
        const option = Expertlist.find((item) => item.name === coachingoption);
        if (!option) throw new Error("Invalid coaching option");

        const PROMPT = option.SUMMARY_PROMPT;
        
        // Try with a more reliable model first
        const completion = await openai.chat.completions.create({
            model: "anthropic/claude-3-haiku", // More reliable alternative
            messages: [
                {role: "assistant", content: PROMPT},
                conversation
            ],
        });

        return completion.choices[0]?.message?.content || "No response from AI";
        
    } catch (error) {
        console.error("AI Model Error:", error);
        return "Sorry, I couldn't process that request.";
    }
}

export const TextToSpeech = async ({ text, expertname }: any) => {
    try {
        const pollyClient = new PollyClient({
            region: "ap-south-1",
            credentials: {
                accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
            }
        });

        // Determine the voice based on expert name
        const voiceMap: Record<string, string> = {
            "Souvik": "Justin",
            "Josh": "Joey",
            "Eva": "Ivy",
            "Danny": "Salli"
        };
        const VoiceId : any = voiceMap[expertname] || "Justin"; // Default to Justin if not found

        const command = new SynthesizeSpeechCommand({
            OutputFormat: "mp3",
            Text: text,
            VoiceId,
            LanguageCode: "en-IN",
            Engine: "standard",
        });

        const { AudioStream } = await pollyClient.send(command);
        
        if (!AudioStream) {
            throw new Error("No audio stream received from Polly");
        }

        // Convert the audio stream to a buffer
        const audioArrayBuffer = await AudioStream.transformToByteArray();
        const audioBlob = new Blob([audioArrayBuffer], { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log(audioUrl)
        return audioUrl;
        
    } catch (error) {
        console.error("Text to Speech Error:", error);
        throw error; // Re-throw the error to handle it in the calling component
    }
}