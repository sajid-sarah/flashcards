import type { Flashcard } from "../types/Flashcard";

export function parseFlashcards(text: string): Flashcard[] {
  const chunks = text
    .trim()
    .split(/Question:/)
    .slice(1); // remove first empty element

  return chunks.map((chunk) => {
    const [questionPart, answerPart] = chunk.split(/Answer:/);

    return {
      question: questionPart.trim(),
      answer: answerPart.trim(),
    };
  });
}