export async function generateFlashcards(prompt: string): Promise<string> {
  const response = await fetch("/api/flashcards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const text = await response.text(); // 404 pages are usually HTML or empty
    throw new Error(`Request failed (${response.status}): ${text || "No response body"}`);
  }

  const data = (await response.json()) as { content?: string };
  return data.content ?? "";
}


export const exampleContent = `- Question: What does Newton’s First Law state about the motion of an object?
- Answer: An object will stay at rest or in motion unless acted on by an external force.

- Question: What is another name for Newton’s First Law?
- Answer: The law of inertia.

- Question: What is required to change the state of motion of an object according to Newton’s First Law?
- Answer: An external force must act on the object.`