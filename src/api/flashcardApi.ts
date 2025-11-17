import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://litellm.studysmarter-infra.de/v1",
  apiKey: "sk-ESJxlFA9folv1VTZGRm58A",
  dangerouslyAllowBrowser: true,
  maxRetries: 0
});

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

export const generateFlashcards = async (prompt: string): Promise<string> => {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: FLASHCARD_ROLE_PROMPT },
      { role: "user", content: prompt }
    ]
  });

  const content = response?.choices?.[0]?.message?.content ?? "";
  return content;
};

export const exampleContent = `- Question: What does Newton’s First Law state about the motion of an object?
- Answer: An object will stay at rest or in motion unless acted on by an external force.

- Question: What is another name for Newton’s First Law?
- Answer: The law of inertia.

- Question: What is required to change the state of motion of an object according to Newton’s First Law?
- Answer: An external force must act on the object.`