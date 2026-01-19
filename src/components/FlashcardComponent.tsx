import React from "react";
import type { Flashcard } from "../types/Flashcard";
import '../components/styles/FlashcardComponent.css';

interface FlashcardComponentProps {
    card: Flashcard;
}

const FlashcardComponent: React.FC<FlashcardComponentProps> = ({ card }) => {
    return (
        <div className="flashcard-container">
            <h4>Question</h4>
            <p>{card.question}</p>
            <h4>Answer</h4>
            <p>{card.answer}</p>
        </div>
    );
};

export default FlashcardComponent;



