import React from "react";
import './styles/NotesInput.css';

const MAX_LENGTH = 1000;

interface NotesInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const NotesInput: React.FC<NotesInputProps> = ({ value, onChange, onSubmit }) => {
  const isEmpty = !value.trim();
  const isNearLimit = value.length >= MAX_LENGTH * 0.9;

  return (
    <div className="notes-input-container">
      <textarea
        className="note-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your notes here..."
        maxLength={MAX_LENGTH}
      />
      <div className="note-input-footer">
        <span className={`char-counter ${isNearLimit ? "char-counter--warning" : ""}`}>
          {value.length} / {MAX_LENGTH}
        </span>
        <button onClick={onSubmit} disabled={isEmpty}>Add Note</button>
      </div>
    </div>
  );
};

export default NotesInput;