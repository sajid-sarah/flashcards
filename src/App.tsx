import { useState } from 'react';
import './App.css'
import { generateFlashcards } from './api/flashcardApi'
//import { exampleContent } from './api/flashcardApi';
import NotesList from './components/NotesList';
import NotesInput from './components/NotesInput';
import FlashcardSwiper from './components/FlashcardSwiper';
import { parseFlashcards } from './utils/parseFlashcards';
import type { Flashcard } from "./types/Flashcard";

function App() {
  const [notes, setNotes] = useState("");
  const [notesList, setNotesList] = useState<string[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const handleSubmitNote = () => {
    if (!notes.trim()) return;

    setNotesList((prev) => [...prev, notes]);
    setNotes("");
  };

  const handleGenerateFlashcards = async (note: string) => {
    const generatedFlashcards = await generateFlashcards(note);
    const parsedFlashcardContent = parseFlashcards(generatedFlashcards);
    setFlashcards(parsedFlashcardContent)
  }

  return (
    <>
      <div>
        <h2>Flashcard Generator ✨</h2>
        <div className='main-container'>
          <div className='left-container'><NotesList notes={notesList} onGenerate={handleGenerateFlashcards} /></div>
          <div className='middle-container'>
            <NotesInput value={notes} onChange={setNotes} onSubmit={handleSubmitNote} />
            <FlashcardSwiper cards={flashcards} />
          </div>
          <div className='right-container'></div>
        </div>
      </div>
    </>
  )
}

export default App
