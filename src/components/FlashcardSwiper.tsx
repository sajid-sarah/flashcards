import React from "react";
import { useState } from "react";
import type { Flashcard  } from "../types/Flashcard";
import FlashcardComponent from "./FlashcardComponent";
import './styles/FlashcardSwiper.css';

interface FlashcardSwiperProps {
    cards: Flashcard[];
}

const FlashcardSwiper: React.FC<FlashcardSwiperProps> = ({ cards }) => {
    const [index, setIndex] = useState(0);

    if (cards.length === 0) return null;
    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    }

    return (
        <div>
            <FlashcardComponent card={cards[index]} />
            <div className="flashcard-btn-container">
                <button onClick={handlePrev} disabled={cards.length <= 1}>Previous</button>
                <button onClick={handleNext} disabled={cards.length <= 1}>Next</button>
            </div>
        </div>
    );
}
export default FlashcardSwiper;