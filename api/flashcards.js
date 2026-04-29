import OpenAI from "openai";

const FLASHCARD_ROLE_PROMPT = `
You are a flashcard generator.

Generate exactly 3 flashcards from the user's notes.

Respond with a JSON object in this shape:
{
  "flashcards": [
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." }
  ]
}

Rules:
- Questions should be concise.
- Answers should be short and factual.
`;


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Invalid prompt" });
  }

  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
    maxRetries: 0,
  });

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: FLASHCARD_ROLE_PROMPT },
        { role: "user", content: prompt },
      ],
    });

    const raw = completion.choices[0].message.content;
    const { flashcards } = JSON.parse(raw);

    if (
      !Array.isArray(flashcards) ||
      flashcards.length !== 3 ||
      !flashcards.every(
        (c) => typeof c.question === "string" && typeof c.answer === "string"
      )
    ) {
      return res.status(500).json({ error: "Invalid flashcard format" });
    }

    return res.status(200).json({ flashcards });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "LLM request failed" });
  }
}
