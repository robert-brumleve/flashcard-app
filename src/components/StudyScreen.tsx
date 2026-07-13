import { LoadedDeck } from "../types/LoadedDeck";
import { useState } from "react";

interface StudyScreenProps {
    deck: LoadedDeck
}

export function StudyScreen({deck}: StudyScreenProps) {
    const [answerReaveled, setAnswerRevealed] = useState(false);
    const showAnswer = () => {
        setAnswerRevealed(true);
    }
    let currentCardIndex = 0
    return (
        <ul>
            <li>{deck.deck.cards[currentCardIndex].front.text}</li>
            {!answerReaveled ? (
                <button onClick={showAnswer}>
                Show Answer
            </button>
            ) : (
                <li>{deck.deck.cards[currentCardIndex].back.text}</li>
            )}
        </ul>
    );
}