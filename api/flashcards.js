import OpenAI from "openai";

const FLASHCARD_ROLE_PROMPT = `
You are a flashcard generator.

Return ONLY valid JSON.
No markdown.
No extra text.

The response MUST be a JSON array of exactly 3 objects.

Each object MUST have this shape:
{
  "question": string,
  "answer": string
}

Rules:
- Questions should be concise.
- Answers should be short and factual.
- Do not include explanations outside the JSON.
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
      temperature: 0.2,
      messages: [
        { role: "system", content: FLASHCARD_ROLE_PROMPT },
        { role: "user", content: prompt },
      ],
    });

    const raw = completion.choices[0].message.content;

    // Hard fail if model misbehaves
    let flashcards;
    try {
      flashcards = JSON.parse(raw);
    } catch {
      return res.status(500).json({
        error: "Model returned invalid JSON",
        raw,
      });
    }

    // Validate shape
    if (
      !Array.isArray(flashcards) ||
      flashcards.length !== 3 ||
      !flashcards.every(
        (c) =>
          typeof c.question === "string" &&
          typeof c.answer === "string"
      )
    ) {
      return res.status(500).json({
        error: "Invalid flashcard format",
        raw,
      });
    }

    return res.status(200).json({ flashcards });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "LLM request failed" });
  }
}
