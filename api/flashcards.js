import OpenAI from "openai";

const FLASHCARD_ROLE_PROMPT = `
You are an AI Flashcard Generator. Your job is to read a short note and instantly turn it into study flashcards.
Rules:
1. Keep each flashcard in the format:
    - Question: ...
    - Answer: ...
2. Only return flashcards, no extra commentary, explanations, or greetings.
3. Return exactly 3 flashcards per prompt.
4. Return the flashcards as plain text that can be parsed easily.
3. Avoid long paragraphs and make sure to include key information.
`;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    
    const client = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
        maxRetries: 0
    });

    const { prompt } = req.body;

    try {
        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: FLASHCARD_ROLE_PROMPT },
                { role: "user", content: prompt }
            ],
            temperature: 0.4,
        });
        
        return res.status(200).json({ content: response.choices[0].message.content });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "LLM request failed" });
    }
}