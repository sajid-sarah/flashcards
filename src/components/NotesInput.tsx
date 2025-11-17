import React from "react";

interface NotesInputProps {
  value: string;
  onChange: (value: string) => void;
}

const NotesInput: React.FC<NotesInputProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your notes here..."
      style={{
        width: "100%",
        height: "120px",
        padding: "10px",
        fontSize: "16px",
        marginBottom: "10px",
      }}
    />
  );
};

export default NotesInput;