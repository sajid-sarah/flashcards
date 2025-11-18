export async function generateFlashcards(prompt: string): Promise<string> {
    const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });
    
    const data = await response.json();
    return data.content;
}

export const exampleContent = `- Question: What does Newton’s First Law state about the motion of an object?
- Answer: An object will stay at rest or in motion unless acted on by an external force.

- Question: What is another name for Newton’s First Law?
- Answer: The law of inertia.

- Question: What is required to change the state of motion of an object according to Newton’s First Law?
- Answer: An external force must act on the object.`