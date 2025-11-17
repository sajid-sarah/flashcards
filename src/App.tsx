import { useState } from 'react';
import './App.css'
//import { generateFlashcards } from './api/flashcardApi'
import { exampleContent } from './api/flashcardApi';
import NotesInput from './components/NotesInput';
import FlashcardSwiper from './components/FlashcardSwiper';
import { parseFlashcards } from './utils/parseFlashcards';
import type { Flashcard } from "./types/Flashcard";

function App() {
  const [notes, setNotes] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const handleGenerateFlashcards = async () => {
    if (!notes.trim()) return;
    //const generatedFlashcards = await generateFlashcards(notes);
    //setFlashcards(generatedFlashcards);
    const parsedFlashcardContent = parseFlashcards(exampleContent);
    setFlashcards(parsedFlashcardContent)
  }

  return (
    <>
      <div>
        <h1>Flashcard Generator</h1>
        <NotesInput value={notes} onChange={setNotes}  />

        <button onClick={handleGenerateFlashcards}>
          Generate Flashcards
        </button>

        <FlashcardSwiper cards={flashcards} />
      </div>
    </>
  )
}

export default App
