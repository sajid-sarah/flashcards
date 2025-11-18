import React from "react";
import './styles/NotesList.css';

interface NotesListProps {
  notes: string[];
  onGenerate: (note: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onGenerate }) => {
  return (
    <div className="note-list-container">
      <h4>Your Notes</h4>
      {notes.length === 0 ? (
        <p className="note-placeholder">Your notes will appear here.</p>
      ) : (
        <div>
          {notes.map((note, index) => (
            <div key={index} className="note-container">
              <div className="note-preview">{note}</div>
              <div className="note-generator" onClick={() => onGenerate(note)}>⚡</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;