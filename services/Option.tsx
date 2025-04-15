export const Expertlist = [
    {
        name: "Lecture On Topic",
        icon: "/lecture.png",
        PROMPT: "Give a detailed lecture on {user_topic}, with key concepts & examples, clear for newbies, in chat format under 120 chars. As the user continues the conversation, dive deeper into the topic, uncovering subtopics, common misconceptions, and advanced insights step-by-step.",
        SUMMARY_PROMPT: "Based on the conversation, summarize lecture key points and concepts as concise notes. Include a detailed discussion overview, extra insights or related knowledge, and provide helpful links or resources for further reading."

    },
    {
        name: "Mock Interview",
        icon: "/interview.png",
        PROMPT: "  Run a mock interview on {user_topic}. Start with basic questions. Ask follow-up questions based on user's answers. Don’t repeat questions. Keep it in realistic chat format under 120 characters. Go deeper as user responds. Give brief, encouraging feedback.",
        SUMMARY_PROMPT:"Based on the mock interview conversation, rate the user’s knowledge (Beginner, Intermediate, or Advanced).  Highlight the user’s strengths, weaknesses, and areas needing improvement. Recommend the best learning resources (articles, courses, videos) to improve on weak areas. Keep the feedback concise, actionable, and structured."
        
    },
    {
        name: "QNA Session",
        icon: "/qna.png",
        PROMPT: "Host a Q&A on {user_topic}, answer in detail, clear doubts, in chat format under 120 chars.",
        SUMMARY_PROMPT: "Based on the conversation, give feedback on the Q&A session, assessing question clarity and answer depth."
    },
    {
        name: "Language Skill",
        icon: "/languages.png",
        PROMPT: "Teach language skills for {user_topic}. Start at the beginner level with vocabulary, simple phrases, and English meanings. Gradually increase difficulty toward advanced usage. Use a friendly, chat-style format under 120 characters. Focus on vocabulary, sentence structure, and practical usage in conversation.",
        SUMMARY_PROMPT: "Based on the conversation, grade the user's language proficiency (Beginner, Intermediate, Advanced). Summarize their progress in vocabulary and usage, highlight strengths, and suggest improvements. Provide personalized learning tips and high-quality resources (apps, videos, or lessons) to continue practicing."  
    },
    {
        name: "Analysis On Topic",
        icon: "/analyse.png",
        PROMPT:" Analyze {user_topic} in a clear, step-by-step way. Break it down into key parts, discuss pros and cons, and guide the user to think critically. Keep it in chat format with each message under 120 characters.",
        SUMMARY_PROMPT: "Based on the conversation, summarize the full analysis with clear, concise bullet points. Highlight the key takeaways, pros, cons, and any neutral or debated aspects."
    },
    {
        name: "Meditation Session",
        icon: "/meditation.png",
        PROMPT:"Guide a calming meditation on {user_topic}. Use peaceful, mindful narration and help the user focus or reflect. Keep each message gentle and under 120 characters in a relaxing chat-style flow.",
        SUMMARY_PROMPT: "Based on the session, summarize the core meditation theme, emotional focus, and key reflections. Present it as simple, soothing notes or affirmations."
        
    },
]

export const Expertavatar = [
    {
        name: "Souvik",
        icon: "/souvik.png",
    },
    {
        name: "Josh",
        icon: "/john.jpeg",
    },
    {
        name: "Eva",
        icon: "/eva.jpeg",
    },
    {
        name: "Danny",
        icon: "/danny.png",
    }
]