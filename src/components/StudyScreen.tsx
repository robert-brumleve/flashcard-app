import { LoadedDeck } from "../types/LoadedDeck";
import { useState } from "react";

interface StudyScreenProps {
    deck: LoadedDeck
}

export function StudyScreen({deck}: StudyScreenProps) {
    const [answerReaveled, setAnswerRevealed] = useState<boolean>(false);
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

    const showAnswer = () => {
        setAnswerRevealed(true);
    }
    const goToNextCard = () => {
        if (currentCardIndex + 1 < deck.deck.cards.length) {
            setCurrentCardIndex((index) => index + 1);
            setAnswerRevealed(false);
        }
    }
    
    return (
        <ul>
            <li>{deck.deck.cards[currentCardIndex].front.text}</li>
            {!answerReaveled ? (
                <button onClick={showAnswer}>
                Show Answer
            </button>
            ) : (
            <>
            <li>{deck.deck.cards[currentCardIndex].back.text}</li>
            <button onClick={goToNextCard}>
                Next Card
            </button>
            </>
            )}
        </ul>
    );
}