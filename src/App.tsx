import { useState } from 'react';
import './App.css'
import { generateFlashcards } from './api/flashcardApi'
import NotesList from './components/NotesList';
import NotesInput from './components/NotesInput';
import FlashcardSwiper from './components/FlashcardSwiper';
import type { Flashcard } from "./types/Flashcard";

function App() {
  const [notes, setNotes] = useState("");
  const [notesList, setNotesList] = useState<string[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitNote = () => {
    if (!notes.trim()) return;
    setNotesList((prev) => [...prev, notes]);
    setNotes("");
  };

  const handleGenerateFlashcards = async (note: string) => {
    setLoading(true);
    setFlashcards([]);
    setError(null);

    try {
      const cards = await generateFlashcards(note);
      setFlashcards(cards);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <h2>Flashcard Generator ✨</h2>
        <div className='main-container'>
          <div className='left-container'><NotesList notes={notesList} onGenerate={handleGenerateFlashcards} /></div>
          <div className='middle-container'>
            <NotesInput value={notes} onChange={setNotes} onSubmit={handleSubmitNote} />
            {loading && <div className="loader"></div>}
            {!loading && error && <p className="error-message">{error}</p>}
            {!loading && !error && <FlashcardSwiper cards={flashcards} />}
          </div>
          <div className='right-container'></div>
        </div>
      </div>
    </>
  )
}

export default App
