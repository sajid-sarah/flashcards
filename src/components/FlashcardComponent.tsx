import React from "react";
import type { Flashcard } from "../types/Flashcard";

interface FlashcardComponentProps {
    card: Flashcard;
}

const FlashcardComponent: React.FC<FlashcardComponentProps> = ({ card }) => {
    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>Question:</h3>
            <p>{card.question}</p>
            <h3>Answer:</h3>
            <p>{card.answer}</p>
        </div>
    );
};

export default FlashcardComponent;



