import React from "react";
import './styles/NotesInput.css';

interface NotesInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const NotesInput: React.FC<NotesInputProps> = ({ value, onChange, onSubmit }) => {
  return (
    <div>
        <textarea className="note-input" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Enter your notes here..."/>
        <button onClick={onSubmit}>Add Note</button>
    </div>
  );
};

export default NotesInput;