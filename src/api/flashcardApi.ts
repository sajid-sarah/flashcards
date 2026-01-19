import type { Flashcard } from "../types/Flashcard";

export async function generateFlashcards(prompt: string): Promise<Flashcard[]> {
  const response = await fetch("/api/flashcards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text || "Request failed"}`);
  }

  const data = (await response.json()) as { flashcards: Flashcard[] };
  return data.flashcards;
}